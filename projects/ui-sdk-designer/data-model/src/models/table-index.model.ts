import { Builder } from "ui-builder";
import { DataField } from "./data-field.model";

export class TableIndex extends Builder<TableIndex>{
  name: string = 'Index';
  type: 'UniqueKey' | 'Index' | 'ColumnStoreIndex' = 'UniqueKey';
  isCluster: boolean = false;
  fields: ColumnIndex[] = [];
}

export interface ColumnIndex {
  field: DataField;
  sortOrder: 'ASC' | 'DESC';
}
