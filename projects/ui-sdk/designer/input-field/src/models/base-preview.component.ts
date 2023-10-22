import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputField } from './input-field.model';

@Component({
  selector: 'base-preview',
  template: `NO UI`,
})
export class BasePreviewComponent implements OnInit {
  @Input() model!: InputField;
  @Output() onUpdateModel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
