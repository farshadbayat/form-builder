import { Injectable, InjectionToken } from "@angular/core";
import { UIControl } from "../models/ui-control.model";

export const FORM_CONFIG = new InjectionToken<FormService>('FORM_CONFIG');
/**
 * This Service Collect All UI Block in Global Service.
 */
@Injectable({ providedIn: 'root' })
export class FormService {
    uiControls: { [name: string]: UIControl } = {};


}
