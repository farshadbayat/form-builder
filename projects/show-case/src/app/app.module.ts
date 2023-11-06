import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIBuilderModule, UIPackage } from '@ui-core/core';
import { ToastNotificationsModule } from 'projects/ui/common/toast-notification';
import { InputFieldModule } from '@ui-designer/input-field';
import { ProgressIndicatorModule } from '@ui-designer/progress-indicator';
import { DataModelModule } from '@ui-designer/data-model';
import { ButtonComponent } from '@ui-bootstrap/button';
import { MenuModule } from '@ui-designer/menu';
import { RippleDirective } from 'projects/ui/common/ripple';



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
  UIBuilderModule.forRoot(DesignerPackageConfig),
  InputFieldModule,
  MenuModule,
  ButtonComponent,
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
    UI_COMMON_MODULES,
    UI_SDK_MODULES

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
