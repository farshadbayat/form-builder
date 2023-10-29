import { FieldOption, DataSource } from "ui-builder";
export type ButtonAppearance = 'normal' | 'icon' | 'link' | 'none';
export type ButtonLoading = 'normal' | 'loading' | 'loading-disable';

export class ButtonOptions extends FieldOption
{
  text: string = '';
  titleStyle?: { [name: string]: any; };
  appearance: ButtonAppearance = 'normal';
  activeMenu: boolean = false;
  menuOpen: boolean = false;
  menuDataSource?: DataSource;
  loading: ButtonLoading = 'normal';
  override typeName: string = 'ButtonControl';
  override packageName: string = 'SDK_Designer';
}
