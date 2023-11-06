import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './menu.component';
import { UIBuilderModule } from '@ui-core/core';



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
