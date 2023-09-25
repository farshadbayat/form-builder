import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UIBuilderModule } from 'ui-builder';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './menu.component';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    UIBuilderModule,
    CdkMenuModule,
    OverlayModule,
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }
