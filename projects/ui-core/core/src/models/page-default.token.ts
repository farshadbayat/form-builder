import { InjectionToken } from "@angular/core";
import { PageOptions } from "./page-options.model";



export const PAGE_DEFAULT_OPTION =
new InjectionToken<PageOptions>('PAGE_DEFAULT_CONFIG',{
  providedIn: 'root',
  factory: PAGE_DEFAULT_OPTIONS_FACTORY,
});

export function PAGE_DEFAULT_OPTIONS_FACTORY(): PageOptions {
  return new PageOptions();
}
