import { Observable } from "rxjs";

export class DataSource<T = any> {    
    
    constructor(public data: T[] | Observable<T[]>) {
    }
    dataDisplay!: string;
    dataValue?: string;
}