import { Directive, Input, ViewContainerRef } from '@angular/core';
import { Field } from './models/field.model';

@Directive({
  selector: '[field]'
})
export class FieldDirective {
  @Input() field!: Field;
  constructor(public viewContainerRef: ViewContainerRef) { }

}
