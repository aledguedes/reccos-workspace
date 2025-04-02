import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
  private readonly STORAGE_KEY_ATTEMPTS = 'loginAttempts';
  private readonly STORAGE_KEY_LOCKED = 'lockedAccounts';

  private loginAttempts: Map<string, number> = new Map();
  private lockedAccounts: Map<string, Date> = new Map();

  constructor(private http: HttpClient) {
    this.loadStateFromStorage();
  }

  // Persistência do estado entre sessões
  private loadStateFromStorage(): void {
    try {
      const attemptsJson = localStorage.getItem(this.STORAGE_KEY_ATTEMPTS);
      const lockedJson = localStorage.getItem(this.STORAGE_KEY_LOCKED);

      if (attemptsJson) {
        const attempts = JSON.parse(attemptsJson);
        this.loginAttempts = new Map(attempts);
      }

      if (lockedJson) {
        const locked = JSON.parse(lockedJson);
        this.lockedAccounts = new Map(
          locked.map(([email, timestamp]: [string, string]) => [
            email,
            new Date(timestamp),
          ])
        );
      }
    } catch (error) {
      console.error('Erro ao carregar estado de bloqueio:', error);
      // Em caso de erro, limpar o armazenamento para evitar problemas futuros
      localStorage.removeItem(this.STORAGE_KEY_ATTEMPTS);
      localStorage.removeItem(this.STORAGE_KEY_LOCKED);
    }
  }

  private saveStateToStorage(): void {
    try {
      // Converter Map para array para armazenamento
      const attemptsArray = Array.from(this.loginAttempts.entries());
      const lockedArray = Array.from(this.lockedAccounts.entries());

      localStorage.setItem(
        this.STORAGE_KEY_ATTEMPTS,
        JSON.stringify(attemptsArray)
      );
      localStorage.setItem(
        this.STORAGE_KEY_LOCKED,
        JSON.stringify(lockedArray)
      );
    } catch (error) {
      console.error('Erro ao salvar estado de bloqueio:', error);
    }
  }

  private incrementLoginAttempt(email: string): number {
    const attempts = (this.loginAttempts.get(email) || 0) + 1;
    this.loginAttempts.set(email, attempts);

    // If max attempts reached, lock the account
    if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + this.LOCK_DURATION_MS);
      this.lockedAccounts.set(email, lockUntil);
      console.log(`Conta ${email} bloqueada até ${lockUntil}`);
    }

    this.saveStateToStorage();
    return attempts;
  }

  public resetLoginAttempts(email: string): void {
    this.loginAttempts.delete(email);
    this.saveStateToStorage();
  }

  public isAccountLocked(email: string): boolean {
    if (!this.lockedAccounts.has(email)) {
      return false;
    }

    const lockUntil = this.lockedAccounts.get(email)!;
    const isLocked = lockUntil > new Date();

    // If lock has expired, remove it
    if (!isLocked) {
      this.lockedAccounts.delete(email);
      this.loginAttempts.delete(email);
      this.saveStateToStorage();
    }

    return isLocked;
  }

  public getAccountLockRemainingTime(email: string): number {
    if (!this.lockedAccounts.has(email)) {
      return 0;
    }

    const lockUntil = this.lockedAccounts.get(email)!;
    return Math.max(0, lockUntil.getTime() - Date.now());
  }

  login(email: string, password: string): Observable<any> {
    // Check if account is locked
    if (this.isAccountLocked(email)) {
      return throwError(() => new Error('ACCOUNT_LOCKED'));
    }

    // Original login logic
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          // Login successful, reset attempts
          this.resetLoginAttempts(email);
          // Store token and user info
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }),
        catchError(error => {
          // Increment failed attempts
          const attempts = this.incrementLoginAttempt(email);
          const remainingAttempts = this.MAX_LOGIN_ATTEMPTS - attempts;

          if (remainingAttempts <= 0) {
            return throwError(() => new Error('ACCOUNT_LOCKED'));
          } else {
            return throwError(() => ({
              ...error,
              remainingAttempts,
            }));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Não remover os dados de bloqueio ao fazer logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
