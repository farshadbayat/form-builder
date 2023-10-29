import { InjectionToken } from "@angular/core";
import { LoadingOptions } from "./loading-options.model";

export const LOADING_DEFAULT_OPTIONS = new InjectionToken<LoadingOptions>('LOADING_DEFAULT_CONFIG');

export const DEFAULT_OPTIONS: LoadingOptions = {
    ...new LoadingOptions(),
    name: 'loading01',
    dir: 'ltr',
    state: 'start',
    size: 42,
    color: '#0d6efd',
  };
