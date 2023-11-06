import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { DataTable } from '../../models/data-table.model';
import { DragDropEvent } from '../../directives/drag-drop.directive';
import { getStyleTranslate } from '../../directives/drag-drop.utils';
import { IPoint } from '../../models/point.model';
import { DataField } from '../../models/data-field.model';
import { RelationService } from '../../services/relation.service';
import { TableRelation } from '../../models/table-relation.model';
import { Rectangle } from '../../models/rectangle.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldDesigner } from '../../models/designer.model';


@Component({
  selector: 'diagram-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges
{
  @Input() table: DataTable = new DataTable();
  @Input() scale: number = 1;
  @Output() onTableDragging = new EventEmitter<TableEvent>();
  @Output() onRelationDragging = new EventEmitter<RelationTableEvent>();
  @HostBinding('style.left.px') get left() { return this.table?.designer?.location.x ?? 10; }
  @HostBinding('style.top.px') get top() { return this.table?.designer?.location.y ?? 10; }
  @HostBinding('style.width.px') get width() { return this.table?.designer?.width ?? 210; }
  @HostBinding('style.z-index') get zIndex() { return this.table?.designer?.zIndex ?? 0; }
  foreignFields: Map<string, DataField> = new Map<string, DataField>();
  currentField: DataField | null = null;

  private _translateXY: IPoint = { x: 0, y: 0 };
  relation: TableRelation | null = null;

  constructor(
    private _relationService: RelationService,
    private _elementRef: ElementRef<HTMLDivElement>,
    private _renderer: Renderer2,
    )
  {
    this._relationService.newRelationAsObs.subscribe(relation =>
    {
      if(relation?.designer.status !== 'none') {
        this.relation = relation;
      } else {
        this.relation = null;
      }
    });
  }

  ngOnChanges(_: SimpleChanges): void
  {
    const fields: [string, DataField][] = this.table.foreignRelations.map(f => [f.field.name, f.field]);
    this.foreignFields = new Map(fields);
  }

  ngOnInit(): void
  {
    this.table.designer.element = this._elementRef.nativeElement;
  }

  tableDrag_onEvent(e: DragDropEvent)
  {
    if (e.type === 'DragStart')
    {
      this._translateXY = { x: this.table.designer.location.x, y: this.table.designer.location.y }; //getStyleTranslate(this.elementRef.nativeElement);
      this.onTableDragging.emit({ table: this.table, type: 'started' });
    } else if (e.type == 'DragMove')
    {
      this.table.designer.location.x = this._translateXY.x + e.data!.x;
      this.table.designer.location.y = this._translateXY.y + e.data!.y;
      this.onTableDragging.emit({ table: this.table, type: 'moving' });
    } else if (e.type == 'DragEnd')
    {
      this._translateXY = getStyleTranslate(this._elementRef.nativeElement);
      this.table.designer.location = { x: this.table.designer.location.x + this._translateXY.x, y: this.table.designer.location.y + this._translateXY.y };
      // const size = CANVAS_CELL_SIZE * this.scale;
      // this.table.designer.location.x = Math.floor(this.table.designer.location.x/size) * size;
      // this.table.designer.location.y = Math.floor(this.table.designer.location.y/size) * size;
      this._renderer.setStyle(this._elementRef.nativeElement, 'transform', `matrix( 1, 0, 0, 1, 0, 0)`);
      this.onTableDragging.emit({ table: this.table, type: 'finished' });
    }
  }

  relationDrag_onEvent(e: DragDropEvent, field: DataField) {
    if(e.type == 'DragStart') {
      this.onRelationDragging.emit({ table: this.table, field: field, type: 'drag' });
    } else if(e.type == 'DragMove' && this.relation?.foreignField == null) {
      const x = this.relation!.designer.from.x + e.data!.x;
      const y = this.relation!.designer.from.y + e.data!.y;
      this.onRelationDragging.emit({ rect: { h: 0, w: 0, x: x, y: y }, type: 'move' });
    } else if(e.type == 'DragEnd') {
      this.onRelationDragging.emit({ table: this.relation?.foreignTable ?? undefined, field: this.relation?.foreignField ?? undefined, type: 'drop' });
    }
  }

  field_onHover(field: DataField) {
    if(this.relation && this.relation.field !== field) {
      this.relation.foreignField = field;
      this.relation.foreignTable = this.table;
      this.onRelationDragging.emit({ table: this.table, field: field, type: 'move' });
    }
  }

  field_onLeave(_: DataField) {
    if(this.relation) {
      this.relation.foreignField = null;
      this.relation.foreignTable = null;
    }
  }

  relation_onMouseup(_e: MouseEvent, field: DataField)
  {
    if(this.relation !== null) {
      this.onRelationDragging.emit({ table: this.table, field: field, type: 'drop' });
    }
  }

  table_onDelete(e: Event) {
    e.stopPropagation();
  }

  table_onEdit(e: Event) {
    e.stopPropagation();
  }

  field_onDelete(e: Event) {
    e.stopPropagation();
  }

  field_onEdit(e: Event) {
    e.stopPropagation();
  }

  field_onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.table.fields, event.previousIndex, event.currentIndex);
    /* because of there is animation in reordering must emit after finished animation */
    requestAnimationFrame(() =>{
      this.onTableDragging.emit({ table: this.table, type: 'refresh' });
    });
  }

  selectField_onClick(field: DataField){
    this.currentField = (this.currentField === field ? null : field);
  }

}

export interface TableEvent
{
  type: 'started' | 'moving' | 'finished' | 'refresh';
  table: DataTable;
}

export interface RelationTableEvent
{
  type: 'drag' | 'move' | 'drop';
  table?: DataTable;
  field?: DataField;
  rect?: Rectangle;
}
