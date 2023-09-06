import { Component, HostBinding, Input } from '@angular/core';
import { BaseControlElement } from 'ui-builder';
import { InputFieldOption } from '../models/input-field.model';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export  class InputFieldComponent extends BaseControlElement {
  @Input() option!: InputFieldOption;
  protected inputIsActive: boolean = false;

  @HostBinding('attr.dir')
  get dir(): string {
    return this.option.dir;
  }

  constructor() {
    super();
    this.initControl('input-field');
  }

  updateModel(value: any) {
    this.option.value = value;
  }

  initOption() {
    if(this.option.previewPortal) {
      console.log(this.option.previewPortal);
    }
  }

  input_onActive(active: boolean) {
    this.inputIsActive = active;
  }
}
