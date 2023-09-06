import { EventEmitter, InjectionToken, Type } from '@angular/core';

export const TOAST_NOTIFICATIONS_CONFIG = new InjectionToken<ToastNotificationsConfig>('ToastNotificationsConfig');

export type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-center';

export interface ToastNotificationsConfig {
  name?: string;
  position?: ToastPosition;
  autoClose?: boolean;
  duration?: number;
  type?: ToastType;
  direction?: 'rtl' | 'ltr';
  component?: Type<any> | null;
  preventDuplicates?: boolean;
  maxStackLimit?: number;
  event?: EventEmitter<any>;
  progress?: 'none' | 'active' | 'on-mouse-pause';
}
