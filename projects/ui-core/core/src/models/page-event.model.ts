import { FieldControl, FormControl } from "./form.model";

export class PageEvent {
  type!: 'Load';
  form?: FormControl;
  field?: FieldControl;
  data?: any;
}
