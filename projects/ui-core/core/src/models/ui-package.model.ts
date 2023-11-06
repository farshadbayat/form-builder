import { UIControl } from "./ui-control.model";

export class UIPackage {
  name: string = 'basic';
  controls: UIControl[] = [];
}

export class RegisterPackage {
  name: string;
  controls: { [name: string]: UIControl } = {};
  constructor(name: string = 'basic') {
    this.name = name;    
  }
}