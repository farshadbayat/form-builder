import { Builder, GUID, NewGUID } from "ui-builder";
import { DataField } from "./data-field.model";
import { TableRelation } from "./table-relation.model";
import { TableDesigner } from "./designer.model";
import { TableIndex } from "./table-index.model";

export class DataTable extends Builder<DataTable> {
    guid: GUID = NewGUID();
    name: string = 'New Table';
    fields: DataField[] = [];
    indexes: TableIndex[] = [];
    private static _relations: TableRelation[] = [];

    /* only for Designer can be save as user preferences */
    designer: TableDesigner = new TableDesigner();

    public get primaryField(): DataField {
      const primaryKey = this.fields.find( f => f.isKey == true);
      if(primaryKey) {
        return  primaryKey;
      } else {
        throw `Primary key not exist.`;
      }
    }

    public get allRelations() {
      return DataTable._relations;
    }

    public get relations() {
      return DataTable._relations.filter( r => r.table.guid == this.guid);
    }

    public get foreignRelations() {
      return DataTable._relations.filter( r => r.foreignTable?.guid == this.guid);
    }

    public addRelation(field: DataField, foreignTable: DataTable, foreignField: DataField): this {
      if(!this.fields.some(f => f.guid == field.guid)) {
        throw `Field with ${field} not exist on Table: ${ this.name }.`;
      } else if(!foreignTable.fields.some(f => f.guid == foreignField.guid)) {
        throw `Field with ${foreignField} not exist on Table: ${ foreignTable.name }.`;
      } else {
        DataTable._relations.push(
          Builder.init<TableRelation>(TableRelation, { table: this, field: field, foreignTable: foreignTable, foreignField: foreignField})
        );
      }
      return this;
    }

    public getField(fieldName: string): DataField | null {
      const field = this.fields.find( f => f.name == fieldName);
      if(field) {
        return field;
      } else {
        return null;
      }
    }

    public getFieldIndex(fieldName: string): number | null {
      const index = this.fields.findIndex( f => f.name == fieldName);
      return index;
    }

    public get foreignKeys(): DataField[] {
      return this.foreignRelations.map( r => r.field);
    }

    public static new(params: Partial<DataTable>): DataTable {
        return Builder.init(DataTable, params);
    }

    public clearSelectedField(fieldName: string = '') {
      if(fieldName === '') {
        this.fields.forEach( f => {
          if(f.designer) {
            f.designer.relationSelected = false;
          }
        });
      } else {
        this.fields.find( f => f.name == fieldName)!.designer!.relationSelected = false;
      }
    }
}
