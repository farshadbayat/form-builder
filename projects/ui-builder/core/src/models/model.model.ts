import { IDictionary } from "./core-type";
import { FieldOption } from "./field-option.model";

export class UIBlock {
    [name: string]: DataField | DataArrayField;
}

export class DataField {
    constructor(data: Partial<DataField>) {
        for (const key of Object.keys(data)) {
            (this as any)[key] = (data as any)[key]
        }
    }
    field!: FieldOption;
    model!: Model;
}

export class DataArrayField extends UIBlock {
    constructor(data: Partial<DataArrayField>) {
        super();
        for (const key of Object.keys(data)) {
            (this as any)[key] = (data as any)[key]
        }
    }
}

export class Model {
    value: IDictionary<any> = {};
    event?: 'OnModelChanged' | 'Child';
}