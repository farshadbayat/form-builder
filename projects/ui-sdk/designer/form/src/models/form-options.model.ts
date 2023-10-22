import { FieldOption, NgStyle } from "ui-builder";
import { Field } from "./field.model";

export class FormOptions extends FieldOption {
  formStyle?: NgStyle;
  className?: string[] | string;
  hide?: boolean;
  defaultValues?: any;
  fields: Field | Field[] = [];
}

