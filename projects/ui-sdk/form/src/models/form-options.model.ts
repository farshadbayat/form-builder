import { BaseControl, ngStyle } from "ui-builder";
import { Field } from "./field.model";

export class FormOptions extends BaseControl {
  formStyle?: ngStyle;
  className?: string[] | string;
  hide?: boolean;
  defaultValues?: any;
  fields: Field | Field[] = [];
}

