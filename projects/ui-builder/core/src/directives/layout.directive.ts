import { Directive, ViewContainerRef } from "@angular/core";
import { Dictionary } from "../models/core-type";

@Directive()
export class LayoutDirective  {
  public views = new  Dictionary<ViewContainerRef>();
}
