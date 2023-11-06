import { NgModule } from '@angular/core';
import { FieldWrapperComponent } from './field-wrapper/field-wrapper.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { InputFieldComponent } from './input-field/input-field.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { UIBuilderModule } from '@ui-core/core';


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
