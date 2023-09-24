import { BehaviorSubject } from "rxjs";
import { BaseControl } from "ui-builder";

export type ProgressAppearance = 'circle' | 'bar';
export type ProgressSpinnerMode = 'determinate' | 'indeterminate';
export type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export abstract class ProgressOptions extends BaseControl {
    abstract appearance: ProgressAppearance;
    state!: 'start' | 'stop' | 'hidden';
    color!: string;
    value$?: BehaviorSubject<number>;
}

export class CircleOptions extends ProgressOptions {
  appearance: 'circle' = 'circle';
  mode: ProgressSpinnerMode = 'determinate';
  diameter!: number;
  strokeWidth?: number;
}

export class BarOptions extends ProgressOptions {
  appearance: 'bar' = 'bar';
  mode: ProgressBarMode = 'determinate';
  bufferValue!: number;
}
