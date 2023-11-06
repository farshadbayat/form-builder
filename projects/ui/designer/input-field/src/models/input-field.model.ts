import { ComponentPortal } from "@angular/cdk/portal";
import { BasePreviewComponent } from "./base-preview.component";
import { InputFieldOption } from "./input-field-option.model";
import { DataSource } from "dist/@ui-core/core";

export type ValueType = 'text' | 'number' | 'number-resize' | 'toggle' | 'radio' | 'category' | 'color' | 'image' | 'date';

export class InputField extends InputFieldOption{
    value: string = '';
    categoryDataSource?: DataSource;
    valueType?: ValueType = 'text';
    valueStyle?: { [name: string]: any; };;
    readonly: boolean = false;
    /* Only For Text & For Category */
    autocompleteDataSource?: DataSource;
    previewPortal?: ComponentPortal<BasePreviewComponent> | null = null;
}



