import { InjectionToken } from "@angular/core";
import { ButtonOptions } from "./button-options.model";

export const BUTTON_DEFAULT_OPTIONS = new InjectionToken<ButtonOptions>('BUTTON_DEFAULT_OPTIONS');

export const DEFAULT_OPTIONS: ButtonOptions = {
  ...new ButtonOptions(),
  name: 'button01',
  dir: 'ltr'
};
  