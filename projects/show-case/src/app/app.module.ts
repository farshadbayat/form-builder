import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UICoreModule, UIPackage } from 'ui-builder';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent, ButtonModule } from 'ui-sdk/button';
import { ToastNotificationsModule } from 'ui-sdk/toast-notification';
import { InputFieldModule } from 'ui-sdk/input-field';
import { MenuModule } from 'ui-sdk/menu';
import { RippleDirective } from 'ui-sdk/ripple';
import { ProgressIndicatorModule } from 'ui-sdk/progress-indicator';
import { DataModelModule } from 'ui-sdk/data-model';


const DesignerPackageConfig: UIPackage = {
  name: 'SDK_Designer',
  controls : [
    {
      name: 'ButtonControl',
      component: ButtonComponent,
      icon: '../../src/assets/control-icons/button.svg'
    }
  ]
};

const UI_COMMON_MODULES = [
  ToastNotificationsModule,
]

const UI_SDK_MODULES = [
  UICoreModule.forRoot(DesignerPackageConfig),
  InputFieldModule,
  MenuModule,
  ButtonModule,
  RippleDirective,
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
    UI_COMMON_MODULES

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
