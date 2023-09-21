import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from './button.component';
import { RippleModule } from 'projects/ui-sdk-designer/ripple';
import { UIBuilderModule } from 'ui-builder';

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
})
export class ButtonModule { }
