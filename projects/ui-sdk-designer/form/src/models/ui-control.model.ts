import { Type } from "@angular/core";

export interface UIControl {
  name: string;
  component: Type<unknown>;
  version: string;
  icon: string;
  group?: string;
}

