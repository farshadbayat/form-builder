import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { DEFAULT_OPTIONS, LOADING_DEFAULT_OPTIONS } from './models/loading-default.token';
import { LoadingComponent } from './loading.component';
import { UIBuilderModule } from 'dist/@ui-core/core';



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
    { provide: LOADING_DEFAULT_OPTIONS, useValue: DEFAULT_OPTIONS}
  ]
})
export class LoadingModule { }
