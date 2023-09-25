import { Component, HostBinding, Input } from '@angular/core';
import { BaseControlElement } from 'ui-builder';


@Component({
  selector: 'button[flat]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'ui-sdk-button'
  }
})
export class ButtonComponent extends BaseControlElement {
  // @Input() option: ButtonOptions = this.defaultConfig;

  constructor() {
    super();

  }
}
