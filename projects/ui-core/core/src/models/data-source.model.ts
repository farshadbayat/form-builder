import { Observable } from "rxjs";
import { CollectType } from "./core-type";

export class DataSource<T = any> {    
    
    constructor(public data: T[] | Observable<T[]>) {
        const t: CollectType<any> = [1,2, 'dd'];
    }
    display!: string;
    value?: any;
}