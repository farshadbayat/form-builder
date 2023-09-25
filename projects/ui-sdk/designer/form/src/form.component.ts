import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormOptions } from './models/form-options.model';
import { FORM_DEFAULT_OPTION } from './models/form-default.token';
import { BaseControlElement } from 'ui-builder';


@Component({
  selector: 'build-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [ ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent extends BaseControlElement {
  @Input() option: FormOptions = this.defaultConfig;
  @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  readonly _size = new Subject<number>();
  readonly _animationState = new BehaviorSubject<'step1' | 'step2'>('step1');

  constructor(@Inject(FORM_DEFAULT_OPTION) private  defaultConfig: FormOptions) {
    super();
  }

}
