import { ComponentRef } from "@angular/core";
import { CollectType, ScalerType } from "./core-type";
import { FieldOption } from "./field-option.model";
import { LayoutDirective } from "../directives/layout.directive";

  export class FormControl
  {
    controls: (FieldControl | FormControl)[] = [];
    layout?: string;
    view?: string;
    layoutRef?: ComponentRef<LayoutDirective>;
    constructor(data: Partial<FormControl> = {}) {
        for (const key of Object.keys(data)) {
            (this as any)[key] = (data as any)[key]
        }
    }

    createFieldControl(field: Partial<FieldControl>): FormControl {
      const fieldControl = Object.assign(new FieldControl(), field);
      this.controls.push(fieldControl);
      return this;
    }

    createFormControl(form: Partial<FormControl>): FormControl {
      const formControl = Object.assign(new FormControl(), form);
      this.controls.push(formControl);
      return this;
    }
  }

  export class OptionModel<T>  {
    name!: keyof T;
    value?: ScalerType | CollectType<ScalerType>;
 }

 export class FieldControl<T extends FieldOption = FieldOption> {
  public view?: string;
  public options!: T;
  public model?: OptionModel<T>[] = [];
  constructor(data: Partial<FieldControl<T>> = {})
  {
    for (const key of Object.keys(data))
    {
      (this as any)[key] = (data as any)[key]
    }
  }
}
