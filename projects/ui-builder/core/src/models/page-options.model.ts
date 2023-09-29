import { BaseControl } from "./base-control.model";
import { ngStyle } from "./core-type";
import { Field } from "./field.model";

export class PageOptions extends BaseControl {    
    controls: Field[] = [];
    package?: string;
    style?: ngStyle;
    className?: string[] | string;
    hide?: boolean;
    defaultValues?: any;
}