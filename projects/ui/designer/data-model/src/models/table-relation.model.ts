import { FieldDesigner, RelationDesigner } from "./designer.model";
import { DataTable } from "./data-table.model";
import { DataField } from "./data-field.model";
import { Builder } from "ui-builder";


export type RelationJoin = 'inner' | 'left' | 'right' | 'full outer' | 'cross' | 'cross apply' | 'outer apply';
export let UniqueCounter: number = 0;

export class TableRelation extends Builder<TableRelation> {
  foreignTable: DataTable | null = null;
  foreignField: DataField | null = null;
  table!: DataTable;
  field!: DataField;
  relationOption?: RelationOption;
  /* only for Designer can be save as user preferences */
  designer: RelationDesigner = new RelationDesigner();
  private _name?: string = undefined;
  get name(): string
  {
    if(this.foreignTable == null && this.foreignField == null) {
      this._name = `new-relation-from-${this.table.name}.${this.field.name}`.replace(/ +/g, "");
    }
    return this._name ?? `${this.table.name}.${this.field.name}-${this.foreignTable!.name}.${this.foreignField!.name}`.replace(/ +/g, "");
  }

  constructor() {
    super();
    UniqueCounter++;
  }

  /* calculate geometry location */
  updateDesigner(status: 'from' | 'to' | 'both' = 'both')
  {
    if(this.table.designer.element) {
      if (status == 'both' || status == 'from'){
        this.field.designer = this.field.designer ?? new FieldDesigner();
        this.field.designer.element = this.field.designer.element ?? this.table.designer.element.querySelector(`li[field-name='${this.field.name}']`)!;
        this.designer.from = {
          x: this.table.designer.location.x,
          y: this.table.designer.location.y + (this.field.designer.element as any).offsetTop,
          w: this.table.designer.width, /* table width */
          h: (this.field.designer.element as any).clientHeight /* field height */
        };
      }
      if ((status == 'both' || status == 'to') && this.foreignField && this.foreignTable)
      {
        this.foreignField.designer = this.foreignField.designer ?? new FieldDesigner();
        this.foreignField.designer.element = this.foreignField.designer.element ?? this.foreignTable.designer.element.querySelector(`li[field-name='${this.foreignField.name}']`)!;
        this.designer.to = {
          x: this.foreignTable.designer.location.x,
          y: this.foreignTable.designer.location.y + (this.foreignField.designer.element as any).offsetTop,
          w: this.foreignTable.designer.width, /* table width */
          h: (this.foreignField.designer.element as any).clientHeight /* field height */
        };
      }
    }
  }
}

export class RelationOption
{
  name!: string;
  join: RelationJoin = 'inner';
  condition?: string;
}


/** Help Annotation  */
/**
    FROM first_table < join_type > second_table [ ON ( join_condition ) ]

*/
