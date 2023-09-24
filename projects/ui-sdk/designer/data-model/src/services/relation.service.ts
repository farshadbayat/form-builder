import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataTable } from "../models/data-table.model";
import { DataField } from "../models/data-field.model";
import { TableRelation } from "../models/table-relation.model";
import { SelectionModel } from "@angular/cdk/collections";
import { IPoint } from "../models/point.model";


@Injectable()
export class RelationService
{
  public selectedRelationGroup = new SelectionModel<string>(true, []);

  _newRelation$ = new BehaviorSubject<TableRelation | null>(null);
  get newRelationAsObs(): Observable<TableRelation | null>
  {
    return this._newRelation$.asObservable();
  }

  public drag(table: DataTable, field: DataField)
  {
    const relation = new TableRelation();
    relation.table = table;
    relation.field = field;
    relation.designer.status = 'from';
    this._newRelation$.next(relation);
  }

  public move(point: IPoint)
  {
    const relation = this._newRelation$.getValue()!;
    relation.designer.to = { ...relation.designer.from, ...{ x: point.x, y: point.y, w: 0 } };   
    this._newRelation$.next(relation);
  }

  public moveToField(table: DataTable, field: DataField)
  {
    const relation = this._newRelation$.getValue()!;
    relation.foreignTable = table;
    relation.foreignField = field;
    
    this._newRelation$.next(relation);
  }

  public drop(table: DataTable, field: DataField)
  {
    const relation = this._newRelation$.getValue()!;
    relation.foreignTable = table;
    relation.foreignField = field;
    relation.designer.status = 'to';
    this._newRelation$.next(relation);
  }

  public reset() {
    this._newRelation$.next(null);
  }

}
