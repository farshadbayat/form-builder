import { IPoint } from "./point.model";
import { DataTable } from "./data-table.model";
import { DiagramDesigner } from "./designer.model";
import { TableRelation } from "./table-relation.model";
import { FieldOption, GUID } from "@ui-core/core";

export const DefaultMargin = 15;

export class DataModelOptions extends FieldOption
{
  protected tables: DataTable[] = [];
  tableLocation?: Map<GUID, IPoint>;
  /* only for Designer can be save as user preferences */
  diagram: DiagramDesigner = new DiagramDesigner();

  get getTables(): DataTable[] {
    return this.tables;
  }

  addTable(table: DataTable) {
    this.tables.push(table);
    this.normalizeZIndex();
  }

  normalizeZIndex() {
    let arrangeTable: DataTable[] = [];
    this.tables.forEach( t => {
      const loc = arrangeTable.findIndex( a => a.designer.zIndex > t.designer.zIndex);
      if( loc == -1) {
        arrangeTable.push(t);
      } else {
        arrangeTable.splice(loc, 0, t);
      }
    });

    arrangeTable.forEach( (t: DataTable, index: number) =>{
      t.designer.zIndex = index;
    });
  }

  setTopMust(table: DataTable)
  {
    let max = table.designer.zIndex;
    this.tables.forEach((t: DataTable, i: number) =>
    {
      max = Math.max(max, t.designer.zIndex);
      if (t.designer.zIndex > table.designer.zIndex)
      {
        t.designer.zIndex--;
      }
    });
    table.designer.zIndex = max;
  }

  arrangeTableLocation()
  {
    let startX = 10, startY = 10;
    const defaultMargin = 50;
    this.getTables.forEach(tbl =>
    {
      tbl.designer.location.x = startX;
      tbl.designer.location.y = startY;
      startX += tbl.designer.width + defaultMargin;
    });
  }

  /* Create Symmetric Zig Zag Margin */
  private getBlankMargin(relations: TableRelation[]): number {
    for (let i = 0; i < relations.length; i++) {
      const sign = i % 2;
      const index = Math.ceil(i / 2);
      const blankMargin = (sign == 0 ? 1 : -1) * index * DefaultMargin;
      if( !relations.some( r => r.designer.margin == blankMargin) ) {
        return i * DefaultMargin;
      }
    }
    return 0;
  }

  updateRelationMargin() {
    this.getTables.forEach(table =>
      {
        const relations = table.relations;
        relations.filter( r => !r.designer.margin).forEach( r =>{
          r.designer.margin = this.getBlankMargin(relations);
        });
      });
  }
}

