import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from './button.component';
import { RippleModule } from 'ui-sdk/ripple';
import { UIBuilderModule } from 'ui-builder';
import { BUTTON_DEFAULT_OPTIONS, DEFAULT_OPTIONS } from './models/button-default.token';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    UIBuilderModule,
    CdkMenuModule,
    OverlayModule,
    RippleModule
  ],
  exports:[
    ButtonComponent
  ],
  providers: [
    { provide: BUTTON_DEFAULT_OPTIONS, useValue: DEFAULT_OPTIONS}
  ]
})
export class ButtonModule { }
