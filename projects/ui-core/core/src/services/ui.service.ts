import { Injectable, InjectionToken } from "@angular/core";
import { UIControl } from "../models/ui-control.model";
import { RegisterPackage, UIPackage } from "../models/ui-package.model";


export const UI_CONFIG = new InjectionToken<UIPackage[]>('UI_CONFIG');
/**
 * This Service Collect All UI Block in Global Service.
 */
@Injectable({ providedIn: 'root' })
export class UIService {
  packages: { [name: string]: RegisterPackage } = {};

  defaultPackage: string = 'basic';

  registerPackage(config?: UIPackage):void {
    if(config) {
      this.packages[config.name] = new RegisterPackage(config.name);
      this.registerControls(config.name, config.controls);
    }
  }

  registerControls(packageName: string = this.defaultPackage, controls?: UIControl[]): void {
    controls?.forEach( control => {
      this.packages[packageName].controls[control.name] = control;
    });
  }

  getControl(name: string, packageName: string = this.defaultPackage): UIControl {
    if(!this.packages[packageName]) {
      throw new Error(`[UI Builder] The package ui "${packageName}" could not be found. Please make sure that is registered.`);
    } else if(!this.packages[packageName].controls[name]) {
      throw new Error(`[UI Builder] The control "${name}" could not be found. Please make sure that is registered in package "${packageName}".`);
    } else {
      return this.packages[packageName].controls[name];
    }
  }

}
