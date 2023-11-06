import { Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RotateSpinner } from './animations/bootstrap.animation';
import { LOADING_DEFAULT_OPTIONS } from './models/loading-default.token';
import { LoadingOptions } from './models/loading-options.model';
import { BaseControlElement } from 'dist/@ui-core/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [ RotateSpinner ]
})
export class LoadingComponent extends BaseControlElement {
  @Input() option: LoadingOptions = this.defaultConfig;
  readonly _size = new Subject<number>();
  readonly _animationState = new BehaviorSubject<'step1' | 'step2'>('step1');

  constructor(@Inject(LOADING_DEFAULT_OPTIONS) private  defaultConfig: LoadingOptions) {
    super();
  }

  start() {
    this._animationState.next( this._animationState.getValue() === 'step1' ? 'step2' : 'step1' );
  }

  animation_onEnd(e: any) {
    console.log(e);
    // if( this.option.state === 'start') {
    //   this._animationState.next( this._animationState.getValue() === 'step1' ? 'step2' : 'step1' );
    // }
  }
}
