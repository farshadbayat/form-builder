import { DataField } from "./data-field.model";
import { DataTable } from "./data-table.model";

export interface DragDropRelation {
    fromTable: DataTable;
    fromField: DataField;
    toTable?: DataTable;
    toField?: DataField;
}
