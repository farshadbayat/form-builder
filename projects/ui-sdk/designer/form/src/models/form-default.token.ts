import { InjectionToken } from "@angular/core";
import { FormOptions } from "./form-options.model";


export const FORM_DEFAULT_OPTION = new InjectionToken<FormOptions>('LOADING_DEFAULT_CONFIG');

export const DEFAULT_OPTION: FormOptions = {
    name: 'Form',
    dir: 'ltr',
    disabled: false,
    fields: [],
  };
