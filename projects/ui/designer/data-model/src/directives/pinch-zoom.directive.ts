import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { clamp } from '@ui-core/core';


/**
 *  https://levelup.gitconnected.com/how-to-implement-pinch-to-zoom-on-the-browser-in-angular-6ad56ce54df4
 */



@Directive({
  selector: '[pinchZoom]',
})
export class PinchZoomDirective implements OnInit {
  @Input() scaleFactor: number = 0.01;
  @Input() zoomThreshold: number = 10;
  @Input() initialZoom: number = 4;
  @Input() debounceTime: number = 100; // in ms
  scale: number = 0;
  @Output() onPinch: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.scale = this.initialZoom;
  }
  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    let scale = this.scale - e.deltaY * this.scaleFactor;
    scale = clamp(scale, 1, this.zoomThreshold);
    this.calculatePinch(scale);
  }

  calculatePinch(scale: number) {
    this.scale = scale;
    this.onPinch.next(this.scale);
  }

}
