import { Observable, Subject } from 'rxjs';
import { Type } from '@angular/core';
import { ToastType } from './models/toast-notifications.config';
import { ToastConfig } from './models/toast.config';

export class Toast {

  readonly autoClose: boolean | undefined;
  readonly duration: number | undefined;
  readonly text: string | string[] | undefined;
  readonly caption: string | undefined;
  readonly type: ToastType;
  readonly component: Type<any> | undefined;

  private readonly closeFunction: ((toast: Toast) => void) | null;
  private readonly _onClose = new Subject<any>();
  private timeoutId: any;
  progressState: 'progress' | 'pause'  = 'progress';
  progress: number = 0;/* in percentage*/
  isOverflow: boolean = false;

  constructor(
      public config: ToastConfig,
      closeFunction: ((toast: Toast) => void) | null = null ,
  ) {
    this.autoClose = config.autoClose;
    this.duration = (config.duration !== undefined && config.duration as number > 0) ? config.duration : 0;
    this.text = config.text;
    this.caption = config.caption;
    this.type = config.type || 'info';
    this.component = config?.component || undefined;
    this.closeFunction = closeFunction;
    this.start();
  }

  get onClose(): Observable<any> {
    return this._onClose.asObservable();
  }

  close(result?: any) {
    if (!this._onClose.closed) {
      this._onClose.next(result);
      this._onClose.complete();
    }
    if(this.closeFunction !== null) {
      this.closeFunction(this);
    }
    this._clearTimeout();
  }

  start() {
    this._setTimeout();
  }

  stop(progress: number = 0) {
    this.progress = progress;
    this._clearTimeout();
  }

  private _setTimeout() {
    if (this.autoClose && this.duration) {
      this.progressState = 'progress';
      this.timeoutId = setTimeout(() => this.close(), this.remain);
    }
  }

  private _clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.progressState = 'pause';
    }
  }

  get remain(): number {
    return (1 - this.progress) * this.duration!; 
  }
}
