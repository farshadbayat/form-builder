import { BaseControl, DataSource } from "ui-builder";

export class MenuOption extends BaseControl {
    overlayClass?: string;
    overlayWidth?: number | string;
    activeMenu: boolean = false;
    menuOpen: boolean = false;
    itemDataSource?: DataSource;
}
