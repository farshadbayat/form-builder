export type LoadingAppearance = 'normal' | 'circle' | 'bar' | 'skeleton';

export abstract class FieldOption {
    name!: string;
    package?: string;
    dir: 'rtl' | 'ltr' = 'ltr';
    loadingAppearance?: LoadingAppearance;
    disabled: boolean = false;
}
