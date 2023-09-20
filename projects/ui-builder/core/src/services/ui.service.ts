import { Injectable, InjectionToken } from "@angular/core";
import { UIControl } from "../models/ui-control.model";
import { UIPackage } from "../models/ui-package.model";


export const UI_CONFIG = new InjectionToken<UIPackage[]>('UI_CONFIG');
/**
 * This Service Collect All UI Block in Global Service.
 */
@Injectable({ providedIn: 'root' })
export class UIService {  
  packages: { [name: string]: UIPackage } = {};

  defaultPackage: string = 'basic';
  
  registerPackage(config?: UIPackage):void {
    debugger
    console.log(config);
    if(config) {
      this.packages[config.name] = config;
    }
  }

  registerControls(packageName: string = this.defaultPackage, controls?: UIControl[]): void {
    controls?.forEach( control => {
      this.packages[packageName].controls[control.name] = control;
    });
  }

}
