import { BaseControl, DataSource, Menu, ngStyle } from "ui-builder";

export type Appearance = 'inline' | 'front' | 'above' | 'none';

export class FieldOption extends BaseControl {
    label: string = '';
    labelStyle?: ngStyle;
    appearance: Appearance = 'inline';
    menu?: Menu;
}
