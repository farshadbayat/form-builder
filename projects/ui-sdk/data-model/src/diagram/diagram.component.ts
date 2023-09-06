import { AfterViewInit, Component, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription, fromEvent, take } from 'rxjs';
import { IPoint } from '../models/point.model';
import { ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataModelOptions } from '../models/data-model-option.model';
import { DATA_MODEL_DEFAULT_OPTION } from '../models/data-model-default.token';
import { DataTable } from '../models/data-table.model';
import { DragDropEvent } from '../directives/drag-drop.directive';
import { getStyleTranslate } from '../directives/drag-drop.utils';
import { RelationTableEvent, TableEvent } from '../components/table/table.component';
import { TableRelation } from '../models/table-relation.model';
import { RelationService } from '../services/relation.service';
import { DiagramHelper } from '../helper/diagram.helper';
import { FieldDesigner } from '../models/designer.model';
import { ToolbarEvent } from '../components/status-bar/status-bar.component';

@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() option: DataModelOptions = this.defaultConfig;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<Element>;
  @ViewChild('svg', { static: true }) svg!: ElementRef<SVGElement>;
  @ViewChild('relations', { static: true }) relations!: ElementRef<SVGGElement>;
  @HostListener('window:keyup', ['$event'])
  onKeyup(event: Event) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.refreshTransform();
  }

  defaultZoom: number = 4;
  userSelectStyle: string = '';
  private _translateXY: IPoint = { x: 0, y: 0 };
  private _subscription: PageSubscription = {};
  private _diagramHelper!: DiagramHelper;
  private _observer!: ResizeObserver;
  relation: TableRelation | null = null;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(DATA_MODEL_DEFAULT_OPTION) private defaultConfig: DataModelOptions,
    private elementRef: ElementRef<HTMLDivElement>,
    private renderer: Renderer2,
    private _relationService: RelationService) {
    this._relationService.newRelationAsObs.pipe().subscribe(relation => {
      this.relation = relation;
      if (this.relation && this.relation.foreignField && this.relation.foreignTable) {
        //console.log(this.relation.foreignField.designer);
        this.relation.updateDesigner('both');
      }
      if (this.relation?.designer.from && this.relation?.designer.to) {        
        this._diagramHelper.drawRelation(this.relation!);
      }
    });
  }

  ngAfterViewInit(): void {
    this.option.diagram.element = this.canvas.nativeElement;
    this.initRelation();
    this._observer = new ResizeObserver(entries => {
      this.renderer.setStyle(this.svg.nativeElement, 'width', `${entries[0].contentRect.width}px`);
      this.renderer.setStyle(this.svg.nativeElement, 'height', `${entries[0].contentRect.height}px`);
      this.updateCanvas();
    });
    this._observer.observe(this.elementRef.nativeElement);
  }

  ngOnInit(): void {
    this._diagramHelper = new DiagramHelper(this.svg.nativeElement, this._relationService);
    this._diagramHelper.applyTransform(this.option.diagram);

    this._diagramHelper.onEvent.subscribe(event => {
      if (event?.type === 'selected') {
        const names = event.extractName();
        const fromTable = this.option.getTables.find(t => t.name == names.fromTable)!;
        const relation = fromTable.relations.find(r => r.name == event.name)!;
        relation.field.designer = relation.field.designer ?? new FieldDesigner();
        relation.foreignField!.designer = relation.foreignField?.designer ?? new FieldDesigner();
        relation.field.designer.relationSelected = true;
        relation.foreignField!.designer.relationSelected = true;
      } else if (event?.type === 'unselected') {
        const names = event.extractName();
        const fromTable = this.option.getTables.find(t => t.name == names.fromTable)!;
        const relation = fromTable.relations.find(r => r.name == event.name)!;
        fromTable.clearSelectedField(relation.field.name);
        relation.foreignTable!.clearSelectedField(relation.foreignField!.name);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option'].currentValue) {
      this.option.arrangeTableLocation();
    }
  }

  ngOnDestroy(): void {
    this._observer.unobserve(this.elementRef.nativeElement);
    this.unsubscribeAllEvent();
  }

  unsubscribeAllEvent() {
    const fields = Object.keys(this._subscription);
    fields.forEach(sub => {
      (this._subscription as any)[sub].unsubscribe();
    });
  }

  initRelation() {
    this.option.updateRelationMargin();
    this.option.getTables.forEach(table => {
      table.relations.forEach(relation => {
        relation.updateDesigner();
        this._diagramHelper.drawRelation(relation);
      });
    });
  }

  updateCanvas() {
    this.renderer.setStyle(this.canvas.nativeElement, 'transform', `matrix(${this.option.diagram.scale}, 0, 0, ${this.option.diagram.scale}, ${-this.option.diagram.location.x}, ${-this.option.diagram.location.y})`);
    this._diagramHelper.applyTransform(this.option.diagram);
  }

  dragDrop_onEvent(e: DragDropEvent) {
    if (e.type == 'DragStart') {
      /* Apply Transform X Y */
      this._translateXY = getStyleTranslate(this.canvas.nativeElement);
    } else if (e.type == 'DragMove') {
      /* Update Transformation */
      this.option.diagram.location.x = -this._translateXY.x + -e.data!.x;
      this.option.diagram.location.y = -this._translateXY.y + -e.data!.y;
      this.updateCanvas();
    }
  }

  level = this.defaultZoom;
  diagram_onPinch(level: number) {
    this.level = level;
    this.option.diagram.scale = level / this.defaultZoom;
    /* Apply Scale & transfer on relation group */
    const dx = (this.elementRef.nativeElement.clientWidth - this.elementRef.nativeElement.clientWidth * this.option.diagram.scale) / 2;
    const dy = (this.elementRef.nativeElement.clientHeight - this.elementRef.nativeElement.clientHeight * this.option.diagram.scale) / 2;
    this.renderer.setStyle(this.relations.nativeElement, 'transform', `matrix(${this.option.diagram.scale}, 0, 0, ${this.option.diagram.scale}, ${dx}, ${dy})`);
    this.updateCanvas();
  }

  handleMouseup() {
    this._document.body.style.setProperty('user-select', this.userSelectStyle);
    this._subscription.mouseup = fromEvent<MouseEvent>(document, 'mouseup')
      .subscribe(_ => {
        this._subscription.mousemove?.unsubscribe();
      });
  }

  // currentTable?: DataTable;
  table_onDragging(event: TableEvent) {
    // this.currentTable = table;
    if (event.type == 'started') {
      this.option.setTopMust(event.table);
    } else if (event.type == 'moving' || event.type == 'refresh') {
      this.updateRelation(event.table);
    }
  }

  tableRelation_onDragging(event: RelationTableEvent) {
    // console.log(event);
    if (event.type == 'drag') {
      this._relationService.drag(event.table!, event.field!);
      this.relation!.updateDesigner('from');
    } else if (event.type == 'move') {      
      if (this.relation?.foreignField && this.relation.foreignField !== event.field) {
        this.relation!.updateDesigner('to');
        debugger
        
        //this._diagram.deleteRelation(this.relation);
      } else if (this.relation && event.field && event.table) {
        this._relationService.moveToField(event.table, event.field);
      } else {
        this._relationService.move({x: event.rect!.x, y: event.rect!.y});
      }
    } else if (event.type == 'drop') {
      this._diagramHelper.deleteRelation(this.relation!);
      if (event.table && event.field && this.relation) {
        const relation = Object.assign(new TableRelation(), this.relation);
        relation.foreignTable = event.table;
        relation.foreignField = event.field;
        relation.table.addRelation(
          relation.field,
          relation.foreignTable,
          relation.foreignField
        );
        this.option.updateRelationMargin();
        this.updateRelation(relation.table);
        this.relation = null;
      }
      this._relationService.reset();
    }
  }

  updateRelation(table: DataTable) {
    table.relations.forEach(relation => {
      relation.updateDesigner('both');
      this._diagramHelper.drawRelation(relation);
    });
    table.foreignRelations.forEach(relation => {
      relation.updateDesigner('both');
      this._diagramHelper.drawRelation(relation);
    });
  }

  toolbar_onEvent(e: ToolbarEvent) {
    if (e.name === 'refresh') {
      this.refreshTransform();
    }
  }

  refreshTransform() {
    const dx = (this.elementRef.nativeElement.clientWidth - this.elementRef.nativeElement.clientWidth * this.option.diagram.scale) / 2;
    const dy = (this.elementRef.nativeElement.clientHeight - this.elementRef.nativeElement.clientHeight * this.option.diagram.scale) / 2;
    this.renderer.setStyle(this.relations.nativeElement, 'transform', `matrix(${this.option.diagram.scale}, 0, 0, ${this.option.diagram.scale}, ${dx}, ${dy})`);
  }


}

// https://stackoverflow.com/questions/62176940/angular-cdk-drag-drop-with-zoom-by-css-property-transform-scale0-5-doesn-t
export interface PageSubscription {
  mousemove?: Subscription;
  mouseup?: Subscription;
}
