import { BaseControl } from "ui-builder";

export type LoadingAppearance = 'normal' | 'growing' | 'bubble' | 'separate-circle' | 'bar';

export class LoadingOptions extends BaseControl {
    appearance!: LoadingAppearance;
    state!: 'start' | 'stop' | 'hidden';
    size!: number;
    color!: string;
}
