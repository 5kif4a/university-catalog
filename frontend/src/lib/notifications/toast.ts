/**
 * Toast Notifications Configuration
 * Centralized toast notification helpers with Apple-style minimalist design
 */

import toast, { Toaster as HotToaster, ToastOptions } from 'react-hot-toast';

/**
 * Apple-style toast configuration
 */
export const toastConfig: ToastOptions = {
  duration: 4000,
  position: 'top-center',
  style: {
    borderRadius: '12px',
    background: '#fff',
    color: '#000',
    padding: '16px 24px',
    fontSize: '0.9375rem',
    fontWeight: 400,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  },
};

/**
 * Show success toast
 */
export function showSuccess(message: string) {
  toast.success(message, {
    ...toastConfig,
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
  });
}

/**
 * Show error toast
 */
export function showError(message: string) {
  toast.error(message, {
    ...toastConfig,
    duration: 5000, // Longer duration for errors
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  });
}

/**
 * Show info toast
 */
export function showInfo(message: string) {
  toast(message, {
    ...toastConfig,
    icon: 'ℹ️',
  });
}

/**
 * Show loading toast
 */
export function showLoading(message: string) {
  return toast.loading(message, toastConfig);
}

/**
 * Dismiss toast
 */
export function dismissToast(toastId: string) {
  toast.dismiss(toastId);
}

/**
 * Export Toaster component for use in App.tsx
 */
export { HotToaster as Toaster };
