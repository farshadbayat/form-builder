import { CdkMenuTrigger } from "@angular/cdk/menu";
import { DataSource } from "./data-source.model";

export class Menu {
    width?: number;
    trigger: CdkMenuTrigger | undefined = undefined; 
    menuDataSource?: DataSource;
}