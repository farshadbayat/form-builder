import { InjectionToken } from "@angular/core";
import { LoadingOptions } from "./loading-options.model";

export const LOADING_DEFAULT_OPTION = new InjectionToken<LoadingOptions>('LOADING_DEFAULT_CONFIG');

export const DEFAULT_OPTION: LoadingOptions = {
    name: 'Loading',
    dir: 'ltr',
    disabled: false,
    appearance: 'normal',
    state: 'start',
    size: 42,
    color: '#0d6efd'
  };
