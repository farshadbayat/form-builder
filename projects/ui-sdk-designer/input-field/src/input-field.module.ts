import { NgModule } from '@angular/core';
import { FieldWrapperComponent } from './field-wrapper/field-wrapper.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UIBuilderModule } from 'ui-builder';
import { InputFieldComponent } from './input-field/input-field.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    FieldWrapperComponent,
    InputFieldComponent
  ],
  imports: [
    UIBuilderModule,
    CdkMenuModule,
    OverlayModule,
  ],
  exports:[
    InputFieldComponent
  ]
})
export class InputFieldModule { }
