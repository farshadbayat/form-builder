export type NgStyle = {[key: string]: any};
export type NgClass = string | string[] | Set<string> | {[key: string]: any};
// export type sdkType = 'Material' | 'NG-Zero' | 'Bootstrap';
export type ScalerType = string | number | bigint | boolean | symbol | any;
export type CollectType<T extends ScalerType = any> = T[];

export class Dictionary<T=any>{
    [name: string]: T;
}
