import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private nextId = 0;

  getToasts() {
    return this.toasts;
  }

  /**
   * Exibe uma mensagem de toast
   * @param message Mensagem a ser exibida
   * @param type Tipo de toast (success, error, warning, info)
   * @param duration Duração em milissegundos (padrão: 5000ms)
   */
  show(message: string, type: ToastType = 'info', duration: number = 5000) {
    const id = this.nextId++;
    const toast: Toast = { message, type, id };

    // Adiciona o toast à lista
    this.toasts.update(current => [...current, toast]);

    // Remove o toast após a duração especificada
    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, duration);

    return id;
  }

  /**
   * Remove um toast específico pelo ID
   */
  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  /**
   * Métodos de conveniência para diferentes tipos de toast
   */
  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    return this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    return this.show(message, 'info', duration);
  }
}
