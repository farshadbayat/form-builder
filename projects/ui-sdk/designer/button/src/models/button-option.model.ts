import { BaseControl, DataSource } from "ui-builder";

export type ButtonAppearance = 'normal' | 'icon' | 'link' | 'none';
export type ButtonLoading = 'normal' | 'loading' | 'loading-disable';

export class ButtonOptions extends BaseControl {
    text: string = '';
    titleStyle?: { [name: string]: any; };
    appearance: ButtonAppearance = 'normal';
    activeMenu: boolean = false;
    menuOpen: boolean = false;
    menuDataSource?: DataSource;
    loading: ButtonLoading = 'normal';
}
