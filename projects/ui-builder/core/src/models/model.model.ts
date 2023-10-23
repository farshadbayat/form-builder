import { Dictionary } from "./core-type";
import { FieldOption } from "./field-option.model";

export namespace UI
{
  export class Form
  {
    controls: Dictionary<Control | ArrayControl> = new Dictionary();

  }

  export class Control
  {
    constructor(data: Partial<Control> = {})
    {
      for (const key of Object.keys(data))
      {
        (this as any)[key] = (data as any)[key]
      }
    }
    field?: FieldOption;
    model: Model = new Model();
  }

  export class ArrayControl extends Form
  {
    constructor(data: Partial<ArrayControl> = {}) {
        super();
        for (const key of Object.keys(data)) {
            (this as any)[key] = (data as any)[key]
        }
    }
  }

  export class Model
  {
    value?: Dictionary<any> = {};
    event?: 'OnModelChanged' | 'Child';
  }

}
