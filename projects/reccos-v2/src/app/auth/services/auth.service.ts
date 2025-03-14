// Add these properties to the AuthService class
private readonly MAX_LOGIN_ATTEMPTS = 5;
private loginAttempts: Map<string, number> = new Map();
private lockedAccounts: Map<string, Date> = new Map();
private readonly LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Add these methods to the AuthService class
private incrementLoginAttempt(email: string): number {
  const attempts = (this.loginAttempts.get(email) || 0) + 1;
  this.loginAttempts.set(email, attempts);
  
  // If max attempts reached, lock the account
  if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
    const lockUntil = new Date(Date.now() + this.LOCK_DURATION_MS);
    this.lockedAccounts.set(email, lockUntil);
    console.log(`Account ${email} locked until ${lockUntil}`);
  }
  
  return attempts;
}

public resetLoginAttempts(email: string): void {
  this.loginAttempts.delete(email);
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

// Modify the login method to check for locked accounts
login(email: string, password: string): Observable<any> {
  // Check if account is locked
  if (this.isAccountLocked(email)) {
    return throwError(() => new Error('ACCOUNT_LOCKED'));
  }
  
  // Original login logic
  return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
    .pipe(
      tap(response => {
        // Login successful, reset attempts
        this.resetLoginAttempts(email);
        // ... existing success handling ...
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
            remainingAttempts
          }));
        }
      })
    );
}