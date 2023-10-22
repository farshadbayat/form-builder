import { BaseControl } from "./base-control.model";
import { NgStyle } from "./core-type";
import { Field } from "./field.model";

export class PageOptions extends BaseControl {    
    controls: Field[] = [];
    package?: string;
    style?: NgStyle;
    className?: string[] | string;
    hide?: boolean;
    defaultValues?: any;
}