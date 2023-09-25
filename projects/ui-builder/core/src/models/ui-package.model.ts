import { UIControl } from "./ui-control.model";

export class UIPackage {
  name: string = 'basic';
  controls: { [name: string]: UIControl } = {};
}
