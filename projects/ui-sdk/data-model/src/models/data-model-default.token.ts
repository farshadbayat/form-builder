import { InjectionToken } from "@angular/core";
import { DataModelOptions } from "./data-model-option.model";

export const DATA_MODEL_DEFAULT_OPTION = new InjectionToken<DataModelOptions>('DATA_MODEL_DEFAULT_CONFIG', {
    providedIn: 'root',
    factory: DATA_MODEL_DEFAULT_OPTIONS_FACTORY,
});

export function DATA_MODEL_DEFAULT_OPTIONS_FACTORY(): DataModelOptions {
    return new DataModelOptions();
  }