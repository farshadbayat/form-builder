import { FieldOption } from "./field-option.model";
import { NgStyle } from "./core-type";
import { Field } from "./field.model";

export class PageOptions extends FieldOption {
    override packageName: string = 'System';
    override typeName: string = 'Page';
    controls: Field[] = [];
    style?: NgStyle;
    defaultValues?: any;
}
