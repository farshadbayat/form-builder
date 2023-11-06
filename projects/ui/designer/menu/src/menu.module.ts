import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UICoreModule } from 'ui-builder';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './menu.component';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    UICoreModule,
    CdkMenuModule,
    OverlayModule,
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }
