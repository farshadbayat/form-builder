import { IDictionary } from "./core-type";
import { FieldOption } from "./field-option.model";

export class Model{
    value: IDictionary<any> = {};
    event?: 'OnModelChanged' | 'Child';
}


export class ObjectModel {
  [name: string]: DataField | DataArrayField;
}


export class DataField {
  field!: FieldOption;
  model!: Model;
}

export class DataArrayField extends ObjectModel{

}

