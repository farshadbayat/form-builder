import { NgClass, NgStyle } from "./core-type";
import { FormControl } from "./form.model";

export type LoadingAppearance = 'normal' | 'circle' | 'bar' | 'skeleton';

export abstract class FieldOption
{
  name!: string;
  className?: NgClass;
  cssStyle?: NgStyle;
  hide?: boolean | ((field: FieldOption, form?: FormControl) => boolean);
  dir: 'rtl' | 'ltr' = 'ltr';
  loadingAppearance?: LoadingAppearance;
  disabled?: boolean = false;
  /* type define which component can display data  */
  typeName!: string;
  packageName?: string;
}
