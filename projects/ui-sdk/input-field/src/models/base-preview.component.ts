import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputFieldOption } from './input-field.model';

@Component({
  selector: 'base-preview',
  template: `NO UI`,
})
export class BasePreviewComponent implements OnInit {
  @Input() model!: InputFieldOption;
  @Output() onUpdateModel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
}
