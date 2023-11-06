import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
let nextId = 0;

@Directive()
export abstract class BaseControlElement implements OnDestroy {
  public id!: string;
  /** Emits whenever the component is destroyed. */
  protected readonly _destroy = new Subject<void>();

  protected initControl(controlName: string) {
    this.id = `${controlName}-${nextId++}`;
  }

  constructor() {
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
