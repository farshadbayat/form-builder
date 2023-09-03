import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinchZoomDirective } from './directives/pinch-zoom.directive';
import { GlobalService } from './services/global.service';

export const GLOBAL_TOKEN = new InjectionToken<GlobalService>('GLOBAL_TOKEN');

@NgModule({
  declarations: [
    PinchZoomDirective
  ],
  imports: [
    CommonModule,
    // RootViewContainerDirective
  ],
  providers:[

  ],
  exports:[
    CommonModule,
    PinchZoomDirective
  ]
})
export class UIBuilderModule {
  static forRoot(): ModuleWithProviders<UIBuilderModule> {
    return {
      ngModule: UIBuilderModule,
      providers: [],
    };
  }
  // constructor(@Optional() @Inject(GLOBAL_TOKEN) globalService: GlobalService) {
  //   console.log(globalService);

  // }
}
