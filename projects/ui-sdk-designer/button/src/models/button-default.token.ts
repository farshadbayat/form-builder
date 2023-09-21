import { InjectionToken } from "@angular/core";
import { ButtonOptions } from "./button-option.model";

export const BUTTON_DEFAULT_OPTIONS =
  new InjectionToken<ButtonOptions>('button-default-options', {
    providedIn: 'root',
    factory: BUTTON_DEFAULT_OPTIONS_FACTORY,
  });

  export function BUTTON_DEFAULT_OPTIONS_FACTORY(): ButtonOptions {
    return new ButtonOptions();
  }
  