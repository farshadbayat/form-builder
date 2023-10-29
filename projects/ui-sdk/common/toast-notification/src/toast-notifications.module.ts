import { ModuleWithProviders, NgModule, Optional, SkipSelf, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { BasicToastContentComponent } from './components/toast-content/basic-toast-content.component';
import { ToastContentDirective } from './directives/toast-content.directive';
import { ToastContainerService } from './services/toast-container.service';
import { TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsConfig } from './models/toast-notifications.config';
import { ToasterService } from './services/toaster.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    ToastContainerComponent,
    BasicToastContentComponent,
    ToastContentDirective,
  ],
  entryComponents: [
    ToastContainerComponent,
    BasicToastContentComponent,
  ],
  providers: [
    // GlobalService,
    ToasterService,
    ToastContainerService,
    {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {}},
  ],
})
export class ToastNotificationsModule {

  constructor(@Optional() @SkipSelf() parentModule: ToastNotificationsModule) {
    if (parentModule) {
      throw new Error('ToastNotificationsModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config: ToastNotificationsConfig = {}): ModuleWithProviders<ToastNotificationsModule> {
    return {
      ngModule: ToastNotificationsModule,
      providers: [
        {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: config},
      ]
    };
  }
}
