import { Injectable, InjectionToken } from "@angular/core";
import { UIControl } from "../models/ui-control.model";
import { UIControlConfig } from "../models/ui-control-config.model";

export const UI_CONFIG = new InjectionToken<UIControlConfig[]>('UI_CONFIG');
/**
 * This Service Collect All UI Block in Global Service.
 */
@Injectable({ providedIn: 'root' })
export class UIService {
    uiControls: { [name: string]: UIControl } = {};

    register(config: UIControlConfig) {
      console.log(config);
      config.uiControls.forEach( control =>{
        this.uiControls[control.name] = control;
      });

    }
}
