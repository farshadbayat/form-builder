import { Inject, Injectable, Type } from '@angular/core';
import { ToastContainerService } from './toast-container.service';
import { ToastConfig } from '../models/toast.config';
import { BasicToastContentComponent } from '../components/toast-content/basic-toast-content.component';
import { TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsConfig } from '../models/toast-notifications.config';
import { Toast } from '../toast';


const DEFAULT_CONFIG: ToastConfig = {
  autoClose: true,
  duration: 8000,
  type: 'light',
  position: 'bottom-left',
  direction: 'rtl',
  progress: 'active',
  component: BasicToastContentComponent,
};

@Injectable()
export class ToasterService {

  constructor(
      @Inject(TOAST_NOTIFICATIONS_CONFIG) private config: ToastNotificationsConfig,
      private containerService: ToastContainerService,
  ) {
  }

  open(config: ToastConfig): Toast | null;
  open(text: string, config?: ToastConfig): Toast | null;
  open(component: Type<any>, config?: ToastConfig): Toast | null;
  open(config: ToastConfig | string | Type<any>, componentConfig?: ToastConfig): Toast | null {    
    if (typeof config === 'string') {
      config = {text: config as string, ...componentConfig};
    }
    if (config instanceof Type) {
      config = {...componentConfig, component: config as Type<any>};
    }
    config = {...DEFAULT_CONFIG, ...this.config, ...config};
    return this.containerService.ref.instance.add(config);
  }
}
