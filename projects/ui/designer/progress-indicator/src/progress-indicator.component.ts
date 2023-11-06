import { Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BaseControlElement } from 'ui-builder';
import { BarOptions, CircleOptions, ProgressAppearance, ProgressOptions } from './models/progress-options.model';
import { PROGRESS_SPINNER_DEFAULT_OPTIONS } from './models/progress-default.token';


@Component({
  selector: 'progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
})
export class ProgressIndicatorComponent extends BaseControlElement {
  @Input()
  set option( value: CircleOptions | BarOptions) {
    if(value && value.appearance == 'circle') {
      this._circleOption = value;
    } else if(value && value.appearance == 'bar') {
      this._barOption = value;
    }
  }

  protected _appearance!: ProgressAppearance;
  protected _circleOption: CircleOptions = this.defaultConfig as CircleOptions;
  protected _barOption: BarOptions = this.defaultConfig as BarOptions;

  readonly _size = new Subject<number>();
  readonly _animationState = new BehaviorSubject<'step1' | 'step2'>('step1');

  constructor(@Inject(PROGRESS_SPINNER_DEFAULT_OPTIONS) private  defaultConfig: ProgressOptions) {
    super();
  }

}
