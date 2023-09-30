import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UIBuilderModule, UIPackage } from 'ui-builder';
import { ToastNotificationsModule } from 'ui-sdk/toast-notification';
import { InputFieldModule } from 'ui-sdk/input-field';
import { MenuModule } from 'ui-sdk/menu';
import { ButtonComponent, ButtonModule } from 'ui-sdk/button';
import { RippleModule } from 'ui-sdk/ripple';
import { ProgressIndicatorModule } from 'ui-sdk/progress-indicator';
import { DataModelModule } from 'ui-sdk/data-model';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const DesignerPackageConfig: UIPackage = {
  name: 'designer',
  controls : [
    {
      name: 'button',
      component: ButtonComponent,
      icon: '../../src/assets/control-icons/button.svg'
    }
  ]
};

const UI_SDK_MODULES = [
  UIBuilderModule.forRoot(DesignerPackageConfig),
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
    UI_SDK_MODULES,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
