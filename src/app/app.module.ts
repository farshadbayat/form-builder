import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InputFieldModule } from 'projects/ui-sdk-designer/input-field';
import { ButtonModule } from 'projects/ui-sdk-designer/button';
import { MenuModule } from 'projects/ui-sdk-designer/menu';
import { RippleModule } from 'ui-sdk/ripple';
import { ProgressIndicatorModule } from 'projects/ui-sdk-designer/progress-indicator';
import { DataModelModule } from 'projects/ui-sdk-designer/data-model';
import { ToastNotificationsModule } from 'projects/ui-sdk-designer/toast-notification';
import { GlobalErrorHandler } from './global-error-handler';
import { UIBuilderModule } from 'ui-builder';


const UI_SDK_MODULES = [
  UIBuilderModule.forRoot(),
  ToastNotificationsModule,
  InputFieldModule,
  MenuModule,
  ButtonModule,
  RippleModule,
  ProgressIndicatorModule,
  DataModelModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkMenuModule,
    UI_SDK_MODULES
  ],
  providers: [
     {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   *
   */
  constructor() {
  }
}
