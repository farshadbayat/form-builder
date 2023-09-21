import { UIControl } from "./ui-control.model";

export interface UIControlOption {
  name: string;
  version: string;
  uiControls: UIControl[];
}
