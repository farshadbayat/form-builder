import { FieldOption } from "ui-builder";

export type LoadingAppearance = 'normal' | 'growing' | 'bubble' | 'separate-circle' | 'bar';

export class LoadingOptions extends FieldOption
{
  appearance!: LoadingAppearance;
  state!: 'start' | 'stop' | 'hidden';
  size!: number;
  color!: string;
  override typeName: string = 'LoadingControl';
  override packageName?: string = 'SDK_Designer';
}
