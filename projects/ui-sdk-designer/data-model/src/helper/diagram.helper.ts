import { fromEvent, merge } from "rxjs";
import { DiagramDesigner } from "../models/designer.model";
import { DefaultLinePath } from "../models/line-path.model";
import { TableRelation } from "../models/table-relation.model";
import { IPoint, Point } from "../models/point.model";
import { SvgRelation } from "../models/svg-relation.model";
import { EventEmitter } from "@angular/core";
import { RelationService } from "../services/relation.service";
import { HasEventTargetAddRemove } from "rxjs/internal/observable/fromEvent";
import { RelationEvent } from "../models/relation-event.model";
import { ManyRelationSVG, OneManyRelationSVG, OneOnlyOneRelationSVG, OneRelationSVG, ZeroManyRelationSVG, ZeroOneRelationSVG } from "./svg-default.config";

export const CANVAS_CELL_SIZE = 24;

/* Margin from Table */
const M = 10;
const AcceptM = M * 2 + 6;
const NameSpaceUrl = "http://www.w3.org/2000/svg";
const RelationStates = ['LL', 'LR', 'RL', 'RR'];
export declare type ERType = 'One' | 'Many' | 'Zero_One' | 'One_only_One' | 'One_Many' | 'Zero_Many';

export class DiagramHelper
{
  private current = { w: -1, h: -1, x: -1, y: -1, z: -1 };
  onEvent = new EventEmitter<RelationEvent | null>();
  constructor(public svg: SVGElement, private _relationService: RelationService)
  {
  }

  backgroundGridImage = (opacity: number): void =>
  {
    this.svg.style.backgroundImage = `radial-gradient(rgb(73 80 87 / ${opacity}) 1px, transparent 0)`;
  }

  getGroupName(element: Element)
  {
    while (element.tagName.toUpperCase() != 'SVG')
    {
      if (element.tagName.toUpperCase() == 'G' && element.attributes.getNamedItem('data-name') !== null)
      {
        return element.attributes.getNamedItem('data-name')!.value;
      }
      element = element.parentElement!;
    }
    return null;
  }

  getRelationSvgGroup(name: string): SvgRelation
  {
    let relationGroup: SVGGElement = this.svg.querySelector(`[data-name="relations"]`)!;
    let group: SVGGElement | null = this.svg.querySelector(`[data-relation-name='${name.toLowerCase()}']`);
    if (!group)
    {
      group = document.createElementNS(NameSpaceUrl, "g");
      group.setAttributeNS(null, 'data-relation-name', name.toLowerCase());
      group.setAttribute('class', 'normal-relation');
      relationGroup.appendChild(group);
    }

    let highlightLinePath: SVGPathElement | null = group.querySelector('path.highlight-line');
    let normalLinePath: SVGPathElement | null = group.querySelector('path.normal-line');
    if (!normalLinePath)
    {
      normalLinePath = document.createElementNS(NameSpaceUrl, "path");
      normalLinePath.setAttribute('class', 'normal-line');
      group.appendChild(normalLinePath);

      let relationDOM: ArrayLike<HasEventTargetAddRemove<any>> = [normalLinePath];
      if (highlightLinePath)
      {
        relationDOM = [normalLinePath, highlightLinePath];
      }
      /* Event Handling for Highligh & Selecting */
      fromEvent<MouseEvent>(relationDOM, 'mouseenter').subscribe(e =>
      {
        const group = (e.target as SVGPathElement).parentElement!;
        group.setAttribute('class', 'active-relation');
        this.highlightRelation(name, 'set');
        this.onEvent.emit(new RelationEvent('hover', group.className));
        highlightLinePath = group.querySelector('path.highlight-line')!;

        fromEvent<MouseEvent>([highlightLinePath, normalLinePath!], 'click').subscribe(_ =>
        {
          if (this._relationService.selectedRelationGroup.isSelected(name.toLocaleLowerCase()))
          {
            this.highlightRelation(name, 'unset');
            this.onEvent.emit(new RelationEvent('unselected', name));
          } else
          {
            this.highlightRelation(name, 'set');
            this.onEvent.emit(new RelationEvent('selected', name));
          }
          this._relationService.selectedRelationGroup.toggle(name.toLocaleLowerCase());
        });

        const relationMouseLeave$ = fromEvent<MouseEvent>(highlightLinePath, 'mouseleave');
        const svgEnter$ = fromEvent<MouseEvent>(this.svg, 'mouseenter');
        const subsLeave = merge(relationMouseLeave$, svgEnter$).subscribe(_ =>
        {
          subsLeave.unsubscribe();
          if (highlightLinePath!.parentElement)
          {
            const groupName = highlightLinePath!.parentElement!.attributes.getNamedItem('data-relation-name')!.value;
            if (groupName && !this._relationService.selectedRelationGroup.isSelected(groupName))
            {
              this.highlightRelation(name, 'unset');
            }
            group.setAttribute('class', 'normal-relation');
          }
          this.onEvent.emit(new RelationEvent('leave', group.className))
        });
      });

    }

    let fromGroup: SVGGElement | null = group.querySelector('g.from-relation-type');
    if (!fromGroup)
    {
      fromGroup = document.createElementNS(NameSpaceUrl, "g");
      fromGroup.setAttribute('class', 'from-relation-type');
      group.appendChild(fromGroup);
    }

    let toGroup: SVGGElement | null = group.querySelector('g.to-relation-type');
    if (!toGroup)
    {
      toGroup = document.createElementNS(NameSpaceUrl, "g");
      toGroup.setAttribute('class', 'to-relation-type');
      group.appendChild(toGroup);
    }

    return { group: group, path: normalLinePath, highlight: highlightLinePath, from: fromGroup, to: toGroup };
  }

  /*
    name: svg group name
  */
  highlightRelation(name: string, status: 'set' | 'unset' | 'update')
  {
    const group = this.getRelationSvgGroup(name);
    if (group.highlight && status == 'update')
    {
      (group.highlight as Element).setAttribute('d', group.path.getAttribute('d')!);
    } else if (group.highlight == null && status == 'set')
    {
      const highlightedPath = group.path.cloneNode(false) as Element;
      highlightedPath.classList.replace('normal-line', 'highlight-line');
      group.group.appendChild(highlightedPath);
    } else if (group.highlight && status == 'unset')
    {
      group.highlight.remove();
    }
  }

  drawRelation(relation: TableRelation)
  {
    const from = {
      leftPoint: new Point(relation.designer.from.x - M, relation.designer.from.y),
      rightPoint: new Point(relation.designer.from.x + relation.designer.from.w + M, relation.designer.from.y)
    };
    const to = {
      leftPoint: new Point(relation.designer.to.x - M, relation.designer.to.y),
      rightPoint: new Point(relation.designer.to.x + relation.designer.to.w + M, relation.designer.to.y)
    };

    const distancePerPoint = [
      from.leftPoint.distanceFrom(to.leftPoint), /* Left to Left*/
      Math.abs(from.leftPoint.x - to.rightPoint.x) > AcceptM && from.leftPoint.x > to.rightPoint.x ? from.leftPoint.distanceFrom(to.rightPoint) : NaN,/* Left to Right*/
      Math.abs(from.rightPoint.x - to.leftPoint.x) > AcceptM && from.rightPoint.x < to.leftPoint.x ? from.rightPoint.distanceFrom(to.leftPoint) : NaN,/* Right to Left*/
      from.rightPoint.distanceFrom(to.rightPoint)/* Right to Right*/
    ];
    const minIndex = distancePerPoint.indexOf(Math.min(...distancePerPoint.filter(p => !Number.isNaN(p))));
    const dirState = RelationStates[minIndex];
    const group = this.getRelationSvgGroup(relation.name);
    group.path.setAttribute("data-type", RelationStates[minIndex].toLocaleLowerCase());

    const my1 = Math.ceil((relation.designer.from.h + DefaultLinePath.strokeWidth) / 2);
    const my2 = Math.ceil((relation.designer.to.h + DefaultLinePath.strokeWidth) / 2);
    const x1 = relation.designer.from.x + (dirState == 'RL' || dirState == 'RR' ? relation.designer.from.w : 0);
    const y1 = relation.designer.from.y + my1;
    const x2 = relation.designer.to.x + (dirState == 'LR' || dirState == 'RR' ? relation.designer.to.w : 0);
    const y2 = relation.designer.to.y + my2;
    const qy = Math.min(16, Math.abs(y2 - y1) / 2);
    const qx = 16;
    const dy = relation.designer.to.y < relation.designer.from.y ? -1 : 1;

    if (RelationStates[minIndex] === 'LL')
    {
      const l = Math.min(from.leftPoint.x, to.leftPoint.x);
      group.path.setAttribute("d",
        `M${x1} ${y1}` +
        `H${l}` +
        `Q${l - qx},${y1} ${l - qx},${y1 + dy * qy}` +
        `V${y2 - dy * qy}` +
        `Q${l - qx},${y2} ${l},${y2}` +
        `H${x2}`
      );
    } else if(RelationStates[minIndex] === 'LR') {
      const l = Math.round((from.leftPoint.x + to.rightPoint.x )/2);
      group.path.setAttribute("d",
        `M${x1} ${y1}` +
        `H${l + qx}` +
        `Q${l},${y1} ${l},${y1 + dy * qy}` +
        `V${y2 - dy * qy}` +
        `Q${l},${y2} ${l-qx},${y2}` +
        `H${x2}`
      );
    } else if(RelationStates[minIndex] === 'RL') {
      const l = Math.round((from.rightPoint.x + to.leftPoint.x )/2);
      group.path.setAttribute("d",
        `M${x1} ${y1}` +
        `H${l - qx}` +
        `Q${l},${y1} ${l},${y1 + dy * qy}` +
        `V${y2 - dy * qy}` +
        `Q${l},${y2} ${l+qx},${y2}` +
        `H${x2}`
      );
    } else {
      const l = Math.max(from.leftPoint.x, to.leftPoint.x);
      group.path.setAttribute("d",
        `M${x1} ${y1}` +
        `H${l}` +
        `Q${l - qx},${y1} ${l - qx},${y1 + dy * qy}` +
        `V${y2 - dy * qy}` +
        `Q${l - qx},${y2} ${l},${y2}` +
        `H${x2}`
      );
    }


    /* if is there highlight path so update(recreate path) */
    if (group.highlight)
    {
      this.highlightRelation(relation.name, 'update');
    }


    this.drawRelationType(group.from, dirState == 'LL' || dirState == 'LR' ? 'Left' : 'Right', {x: x1, y: y1}, 'Many');
    this.drawRelationType(group.to, dirState == 'LL' || dirState == 'RL' ? 'Left' : 'Right', {x: x2, y: y2}, 'Zero_Many');

  }

  drawRelationType(group: SVGGElement, side: 'Left' | 'Right', point: IPoint, type: ERType)
  {

    let path: SVGPathElement | null = group.querySelector('path');
    if (path === null)
      {
        path = document.createElementNS(NameSpaceUrl, "path");
        path.setAttribute('class', 'many');
        group.appendChild(path);
      }
      path.setAttribute('data-type', type.toLocaleLowerCase());

      switch(type) {
        case "One":
          path.setAttribute("d",OneRelationSVG(point, side));
          break;
        case "Many":
          path.setAttribute("d",ManyRelationSVG(point, side));
          break;
        case "Zero_One":
          path.setAttribute("d",ZeroOneRelationSVG(point, side));
          break;
        case "One_only_One":
          path.setAttribute("d",OneOnlyOneRelationSVG(point, side));
          break;
        case "One_Many":
          path.setAttribute("d",OneManyRelationSVG(point, side));
          break;
        case "Zero_Many":
          path.setAttribute("d",ZeroManyRelationSVG(point, side));
          break;
      }
  }

  applyTransform(diagram: DiagramDesigner)
  {
    if (diagram.scale != this.current.z)
    {
      const size = CANVAS_CELL_SIZE * diagram.scale;
      this.current.z = diagram.scale;

      if (diagram.scale < 0.5)
      {
        this.backgroundGridImage(0);
      } else if (diagram.scale <= 0.9)
      {
        this.backgroundGridImage(0.3);
      } else
      {
        this.backgroundGridImage(0.7);
      }
      this.svg.style.backgroundSize = `${size}px ${size}px`;
    }

    const w = this.svg.clientWidth;
    const h = this.svg.clientHeight;
    if (w !== this.current.w || h !== this.current.h || diagram.location.x !== this.current.x || diagram.location.y !== this.current.y)
    {
      this.svg.setAttribute('viewBox', `${diagram.location.x} ${diagram.location.y} ${w} ${h}`);

      if (diagram.location.x !== this.current.x || diagram.location.y !== this.current.y)
      {
        this.svg.style.backgroundPosition = `${(-diagram.location.x)}px ${(-diagram.location.y)}px`;
      }

      this.current.w = w;
      this.current.h = h;

      this.current.x = diagram.location.x;
      this.current.y = diagram.location.y;
    }

  }

  deleteRelation(relation: TableRelation)
  {
    let group: SVGGElement | null = this.svg.querySelector(`[data-relation-name='${relation.name.toLowerCase()}']`);
    group?.remove();
  }

}

/*
  SVG Path Tags:
    M = moveto
    L = lineto
    H = horizontal lineto (dx)
    V = vertical lineto (dy)
    C = curveto
    S = smooth curveto
    Q = quadratic Bézier curve
    T = smooth quadratic Bézier curveto
    A = elliptical Arc
    Z = closepath
*/
