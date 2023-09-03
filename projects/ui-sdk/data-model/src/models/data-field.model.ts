import { Builder, GUID, NewGUID } from "ui-builder";
import { FieldDesigner } from "./designer.model";

export declare type DataType = 'string' | 'number' | 'boolean' | 'object';

export class DataField extends Builder<DataField> {
  guid: GUID = NewGUID();
  name: string = 'Field';
  type: DataType = 'string';
  isNullable?: boolean = true;
  isKey?: boolean = false;

  /* only for Designer can be save as user preferences */
  designer?: FieldDesigner;

  public static new(params: Partial<DataField>): DataField {
    return Builder.init(DataField, params);
  }
}
