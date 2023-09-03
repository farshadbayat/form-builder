export type LoadingAppearance = 'normal' | 'circle' | 'bar' | 'skeleton';

export abstract class BaseControl {
    name!: string;
    dir: 'rtl' | 'ltr' = 'ltr';
    loadingAppearance?: LoadingAppearance;
    disabled: boolean = false;
}
