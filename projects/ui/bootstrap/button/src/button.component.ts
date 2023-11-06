import { ChangeDetectionStrategy, Component, Inject, Input, inject } from '@angular/core';
import { ButtonOptions } from './models/button-options.model';
import { BUTTON_DEFAULT_OPTIONS } from './models/button-default.token';
import { BaseControlElement } from 'ui-builder';
// import { RippleDirective } from 'ui-sdk/ripple';


@Component({
  selector: 'button[flat]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives:[
    // {
    //   directive: RippleDirective,
    //   inputs: ['ripple']
    // }
  ],
  host: {
    class: 'ui-sdk-button'
  }
})
export class ButtonComponent extends BaseControlElement {
  @Input() option: ButtonOptions = this.defaultConfig;
  // private readonly _disabledState: RippleDirective = inject(RippleDirective, { self: true });

  constructor(@Inject(BUTTON_DEFAULT_OPTIONS) private  defaultConfig: ButtonOptions) {
    super();
    // this._disabledState.ripple = true;
  }
}
