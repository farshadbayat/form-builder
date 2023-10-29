import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { Toast } from '../../toast';
import { ToastConfig } from '../../models/toast.config';
import { ToastPosition } from '../../models/toast-notifications.config';


const nestedTransition = transition('* => *', [
  query('@*', animateChild(), {optional: true})
]);

const shrinkInTransition = transition('void => *', [
  style({height: 0, opacity: 0, 'margin-top': 0}),
  animate(200, style({height: '*', opacity: 1, 'margin-top': '1rem'}))
]);

const shrinkOutTransition = transition('* => void', [
  style({height: '!', opacity: 1, 'margin-top': '1rem'}),
  animate(150, style({height: 0, opacity: 0, 'margin-top': 0}))
]);

const progressTransition = transition('void => *', [
  style({width: '{{width}}%', opacity: '{{opacity}}'}),
  animate('{{duration}}ms', style({width: '100%', opacity: 1}))
]);

@Component({
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [
    trigger('nested', [nestedTransition]),
    trigger('shrink', [shrinkInTransition, shrinkOutTransition]),
    trigger('progress', [progressTransition]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {

  tl: Toast[] = [];
  tc: Toast[] = [];
  tr: Toast[] = [];
  bl: Toast[] = [];
  bc: Toast[] = [];
  br: Toast[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }
  config: any = null;
  updateOverflowToast(collection: Toast[], maxSize: number) {
    collection.forEach( (toast: Toast, i: number) =>{
      if(i < collection.length - maxSize) {
        toast.isOverflow = true;
      } else {
        toast.isOverflow = false;
      }
    });
  }

  add(config: ToastConfig): Toast | null {
    this.config = config;
    const collection = this._getCollection(config.position || 'bottom-left');
    if (config.preventDuplicates && this._isDuplicate(collection, config)) {
      return null;
    }
    const toast = new Toast(config, (t) => this._delete(collection, t));
    collection.push(toast);    
    if(config.maxStackLimit !== undefined) {
      this.updateOverflowToast(collection, config.maxStackLimit);
    }
    this.changeDetector.detectChanges();
    return toast;
  }

  private _delete(collection: Toast[], toast: Toast): void {
    collection.splice(collection.indexOf(toast), 1);
    if(toast.config.maxStackLimit !== undefined) {
      this.updateOverflowToast(collection, toast.config.maxStackLimit);
    }
    this.changeDetector.detectChanges();
  }

  private _isDuplicate(collection: Toast[], config: ToastConfig): boolean {
    return collection.some(t => {
      return t.type === config.type
        && t.component === config.component
        && t.caption === config.caption
        && JSON.stringify(t.text) === JSON.stringify(config.text);
    });
  }

  private _getCollection(position: ToastPosition): Toast[] {
    switch (position) {
      case 'top-left':
        return this.tl;
      case 'top-center':
        return this.tc;
      case 'top-right':
        return this.tr;
      case 'bottom-left':
        return this.bl;
      case 'bottom-center':
        return this.bc;
      default:
        return this.br;
    }
  }

  mouse_onEvent(event: MouseEvent, toast: Toast) {
    if(event.type === 'mouseenter') {
      const container = event.target as Element;
      const progress = container.querySelector('[role="progressbar"]')!;
      toast.stop(progress.clientWidth/container.clientWidth);
    } else if(event.type === 'mouseleave') {
      toast.start();
    }
  }

  test() {
    this.changeDetector.detectChanges();
  }
}
