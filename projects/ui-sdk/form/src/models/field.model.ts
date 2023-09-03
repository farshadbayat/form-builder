import { Observable } from "rxjs";
import { FormOptions } from "./form-options.model";

export interface Field<P = FieldProperties & { [additionalProperties: string]: any }> {
    key?: string | number | (string | number)[];
    /**
   * Array of functions to execute, as a pipeline, whenever the model updates, usually via user input.
   */
    parsers?: ((value: any) => any)[];
    props?: P;
    hide?: boolean | ((field: Field, form?: FormOptions) => boolean);
    className?: string;
    expressions?: {
        [property: string]: string | ((field: Field) => any) | Observable<any>;
    };
    childField?: Field | Field[];
    /**
   * The parent field.
   */
    readonly parent?: Field;
}

export interface FieldProperties {

}