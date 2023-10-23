import { FieldOption } from "./field-option.model";
import { NgStyle } from "./core-type";
import { Field } from "./field.model";

export class PageOptions extends FieldOption {
    controls: Field[] = [];
    style?: NgStyle;
    className?: string[] | string;
    hide?: boolean;
    defaultValues?: any;
}
