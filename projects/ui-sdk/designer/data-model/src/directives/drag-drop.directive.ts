import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { IPoint } from "../models/point.model";
import { Subject, Subscription, fromEvent, merge, takeUntil } from "rxjs";

const MouseMoveEvent$ = fromEvent<MouseEvent>(document, 'mousemove');
const TouchMoveEvent$ = fromEvent<TouchEvent>(document, 'touchmove');
const MouseUpEvent$ = fromEvent<MouseEvent>(document, 'mouseup');
const TouchEndEvent$ = fromEvent<TouchEvent>(document, 'touchend');

@Directive({
  selector: '[dragDrop]'
})
export class DragDropDirective implements OnInit, OnDestroy {
  @Input() scale: number = 1;
  @Output() event: EventEmitter<DragDropEvent> = new EventEmitter();
  subDragMove: Subscription | undefined;
  subDragEnd: Subscription | undefined;
  dragStartPoint!: IPoint;
  private _unsubscribe = new Subject<void>();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onStart(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent && e.button == 0) {
      e.preventDefault();
      this.startDrag({ x: e.clientX, y: e.clientY });
    } else if (e instanceof TouchEvent) {
      this.startDrag({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subDragMove?.unsubscribe();
    this.subDragEnd?.unsubscribe();
  }

  startDrag(point: IPoint) {
    this.subDragMove?.unsubscribe();
    this.dragStartPoint = point;
    this.subDragMove = merge(MouseMoveEvent$, TouchMoveEvent$)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (e) => {
          let point!: IPoint;
          if (e instanceof MouseEvent) {
            e.preventDefault();
            point = { x: (e.clientX - this.dragStartPoint.x) * (1/ this.scale), y: (e.clientY - this.dragStartPoint.y)*(1/ this.scale) };
          } else if (e instanceof TouchEvent) {
            point = { x: (e.touches[0].clientX - this.dragStartPoint.x) * (1/ this.scale), y: (e.touches[0].clientY - this.dragStartPoint.y) * (1/ this.scale) };
          }
          this.event.emit({ type: 'DragMove', startPoint: this.dragStartPoint, data: point });
        }
      });

    if (this.subDragEnd?.closed == false) {
      this.subDragEnd.unsubscribe();
    }
    this.subDragEnd = merge(MouseUpEvent$, TouchEndEvent$)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (e) => {
          if (e instanceof MouseEvent) {
            e.preventDefault();
          } else if (e instanceof TouchEvent) {
            // TODO: Prevent Default
          }
          this.endDrag();
        }
      });
    this.event.emit({ type: 'DragStart', startPoint: this.dragStartPoint, data: point });
  }

  endDrag() {
    this.subDragMove?.unsubscribe();
    this.subDragEnd?.unsubscribe();
    this.event.emit({ type: 'DragEnd', startPoint: this.dragStartPoint });
  }
}

export class DragDropEvent {
  type: 'DragStart' | 'DragMove' | 'DragEnd' = 'DragStart';
  startPoint!: IPoint;
  data?: IPoint;
}


