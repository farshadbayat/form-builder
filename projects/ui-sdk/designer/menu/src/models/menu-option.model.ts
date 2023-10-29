import { FieldOption, DataSource } from "ui-builder";

export class MenuOption extends FieldOption {
    overlayClass?: string;
    overlayWidth?: number | string;
    activeMenu: boolean = false;
    menuOpen: boolean = false;
    itemDataSource?: DataSource;
    override typeName: string = 'MenuControl';
    override packageName?: string = 'SDK_Designer';
}
