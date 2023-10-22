export type NgStyle = {[key: string]: any};
export type NgClass = string | string[] | Set<string> | {[key: string]: any};
// export type sdkType = 'Material' | 'NG-Zero' | 'Bootstrap';
export type ScalerType = string | number | bigint | boolean | any;
export type CollectType<T extends ScalerType = any> = T[];

export interface IDictionary<T=any>{
    [name: string]: T;
}