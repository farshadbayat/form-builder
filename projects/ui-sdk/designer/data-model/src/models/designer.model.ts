import { IPoint, Point } from "./point.model";
import { Rectangle } from "./rectangle.model";

export class DiagramDesigner{
    location: IPoint = { x: 0, y: 0 };
    scale: number = 1;
    element?: Element;
}

export class TableDesigner {
    location: IPoint = { x: 0, y: 0 };
    width: number = 210;
    height?: number;
    status: 'normal' | 'minimize' = 'normal';
    zIndex: number = 1;
    element!: Element;
}

export class FieldDesigner {
  element!: Element;
  relationSelected: boolean = false;
}

export class RelationDesigner {
    status: 'from' | 'to' | 'none' = 'to';
    from: Rectangle = {x:0, y:0, w: 0, h:0};
    to: Rectangle = {x:0, y:0, w: 0, h:0};
    margin?: number;
}
