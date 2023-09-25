import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormComponent } from './form.component';
import { DEFAULT_OPTION, FORM_DEFAULT_OPTION } from './models/form-default.token';
import { FormService, FORM_CONFIG } from './services/form.service';
import { UIControlOption } from './models/ui-control-option.model';
import { UIBuilderModule } from 'ui-builder';

export function defaultFormConfig(formService: FormService): UIControlOption {
  return {
    name: 'System UI Controls',
    version: '1.0.0',
    uiControls: []
  };
}

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    UIBuilderModule,
  ],
  exports: [
    FormComponent
  ],
  // providers: [
  //   { provide: FORM_DEFAULT_OPTION, useValue: DEFAULT_OPTION},
  // ]
})
export class FormModule {
  static forRoot(config: UIControlOption): ModuleWithProviders<FormModule> {
    return {
      ngModule: FormModule,
      providers: [
        { provide: FORM_DEFAULT_OPTION, useValue: DEFAULT_OPTION},
        { provide: FORM_CONFIG, multi: true, useFactory: defaultFormConfig, deps: [FormService] },
        FormService
      ],
    };
  }

  static forChild(config: UIControlOption): ModuleWithProviders<FormModule> {
    return {
      ngModule: FormModule,
      providers: [
        { provide: FORM_DEFAULT_OPTION, useValue: DEFAULT_OPTION},
        { provide: FORM_CONFIG, multi: true, useFactory: defaultFormConfig, deps: [FormService] }
      ],
    };
  }
}
