import { InjectionToken } from "@angular/core";
import { PageOptions } from "./page-options.model";



export const PAGE_DEFAULT_OPTION = new InjectionToken<PageOptions>('PAGE_DEFAULT_CONFIG');

export const DEFAULT_OPTION: PageOptions = {
    name: 'Loading',
    dir: 'ltr',
    disabled: false,
    fields: []
  };
