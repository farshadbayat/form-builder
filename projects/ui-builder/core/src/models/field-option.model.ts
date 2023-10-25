import { NgClass, NgStyle } from "ui-builder";
import { UI } from "../models/form.model";

export type LoadingAppearance = 'normal' | 'circle' | 'bar' | 'skeleton';

export abstract class FieldOption  {
    name!: string;
    package?: string;
    className?: NgClass;
    cssStyle?: NgStyle;
    hide?: boolean | ((field: FieldOption, form?: UI.Form) => boolean);
    /* type define which component can display data  */
    type?: string;
    dir: 'rtl' | 'ltr' = 'ltr';
    loadingAppearance?: LoadingAppearance;
    disabled: boolean = false;
}
