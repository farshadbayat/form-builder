import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UIBuilderModule } from 'ui-builder';
import { OverlayModule } from '@angular/cdk/overlay';
import { DEFAULT_OPTION, LOADING_DEFAULT_OPTION } from './models/loading-default.token';
import { LoadingComponent } from './loading.component';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    UIBuilderModule,
    CdkMenuModule,
    OverlayModule,
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    { provide: LOADING_DEFAULT_OPTION, useValue: DEFAULT_OPTION}
  ]
})
export class LoadingModule { }
