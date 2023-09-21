import { ToastNotificationsConfig } from './toast-notifications.config';

export interface ToastConfig extends ToastNotificationsConfig {
  text?: string | string[];
  caption?: string;
}
