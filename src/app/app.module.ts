import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InputFieldModule } from 'ui-sdk/input-field';
import { ButtonModule } from 'ui-sdk/button';
import { MenuModule } from 'ui-sdk/menu';
import { RippleModule } from 'ui-sdk/ripple';
import { ProgressIndicatorModule } from 'ui-sdk/progress-indicator';
import { DataModelModule } from 'ui-sdk/data-model';
import { ToastNotificationsModule } from 'ui-sdk/toast-notification';
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
