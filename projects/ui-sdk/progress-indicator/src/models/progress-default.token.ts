import { InjectionToken } from "@angular/core";
import { BarOptions, CircleOptions } from "./progress-options.model";
import { BehaviorSubject } from "rxjs";


/* Default for circle  */

export const PROGRESS_SPINNER_DEFAULT_OPTIONS =
  new InjectionToken<CircleOptions>('progress-spinner-default-options', {
    providedIn: 'root',
    factory: PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
  });

export function PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY(): CircleOptions {
  return {
    name: 'Loading',
    dir: 'ltr',
    disabled: false,
    mode: 'determinate',
    appearance: 'circle',
    state: 'start',
    diameter: 42,
    color: '#0d6efd',
    value$: new BehaviorSubject(10)
  };
}

/* Default for bar  */

export const PROGRESS_BAR_DEFAULT_OPTIONS =
  new InjectionToken<BarOptions>('progress-bar-default-options', {
    providedIn: 'root',
    factory: PROGRESS_BAR_DEFAULT_OPTIONS_FACTORY,
  });

export function PROGRESS_BAR_DEFAULT_OPTIONS_FACTORY(): BarOptions {
  return {
    name: 'Loading',
    dir: 'ltr',
    disabled: false,
    mode: 'determinate',
    appearance: 'bar',
    state: 'start',
    bufferValue: 0,
    color: '#0d6efd',
    value$: new BehaviorSubject(10)
  };
}
