import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from './button.component';
import { BUTTON_DEFAULT_OPTIONS, DEFAULT_OPTIONS } from './models/button-default.token';
import { UICoreModule } from 'dist/ui-core';
// import { RippleDirective } from 'ui-sdk/ripple';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    UICoreModule,
    CdkMenuModule,
    OverlayModule,
    // RippleDirective
  ],
  exports:[
    ButtonComponent
  ],
  providers: [
    { provide: BUTTON_DEFAULT_OPTIONS, useValue: DEFAULT_OPTIONS}
  ]
})
export class ButtonModule { }
