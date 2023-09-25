import { BaseControl } from "./base-control.model";
import { ngStyle } from "./core-type";
import { Field } from "./field.model";

export class PageOptions extends BaseControl {    
    fields: Field[] = [];
    package?: string;
    style?: ngStyle;
    className?: string[] | string;
    hide?: boolean;
    defaultValues?: any;
}