import { FieldOption, DataSource, Menu, NgStyle } from "ui-builder";

export type Appearance = 'inline' | 'front' | 'above' | 'none';

export class InputFieldOption extends FieldOption {
    label: string = '';
    labelStyle?: NgStyle;
    appearance: Appearance = 'inline';
    menu?: Menu;
}
