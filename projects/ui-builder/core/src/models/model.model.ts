import { IDictionary } from "./core-type";

export class Model{
    value: IDictionary<any> = {};
    event?: 'OnModelChanged' | 'Child';
}

