import { DataSource, FieldOption } from "@ui-core/core";


export class MenuOption extends FieldOption {
    overlayClass?: string;
    overlayWidth?: number | string;
    activeMenu: boolean = false;
    menuOpen: boolean = false;
    itemDataSource?: DataSource;
    override typeName: string = 'MenuControl';
    override packageName?: string = 'SDK_Designer';
}
