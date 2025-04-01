import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast toast-top toast-end z-50">
      @for (toast of toasts(); track toast.id) {
        <div class="toast-item {{ getAlertClass(toast.type) }}">
          <div class="toast-content">
            <span class="toast-icon">{{ getIcon(toast.type) }}</span>
            <span class="toast-message">{{ toast.message }}</span>
          </div>
          <button class="toast-close" (click)="closeToast(toast.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast {
        padding: 0.5rem;
        pointer-events: auto;
      }
      .toast-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
        animation: slideIn 0.3s ease-out;
        transition: all 0.3s ease;
        box-shadow:
          0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        max-width: 24rem;
        overflow: hidden;
      }
      .toast-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .toast-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }
      .toast-message {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .toast-close {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.15s ease;
        margin-left: 0.75rem;
      }
      .toast-close:hover {
        opacity: 1;
      }
      .toast-close svg {
        width: 1rem;
        height: 1rem;
      }
      .alert-success {
        background-color: #ecfdf5;
        border-left: 4px solid #10b981;
        color: #065f46;
      }
      .alert-error {
        background-color: #fef2f2;
        border-left: 4px solid #ef4444;
        color: #b91c1c;
      }
      .alert-warning {
        background-color: #fffbeb;
        border-left: 4px solid #f59e0b;
        color: #92400e;
      }
      .alert-info {
        background-color: #eff6ff;
        border-left: 4px solid #3b82f6;
        color: #1e40af;
      }
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  toasts = computed(() => this.toastService.getToasts()());

  constructor(private toastService: ToastService) {}

  getAlertClass(type: string): string {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
      default:
        return 'alert-info';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  }

  closeToast(id: number): void {
    this.toastService.remove(id);
  }
}
