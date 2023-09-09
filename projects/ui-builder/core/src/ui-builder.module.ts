import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinchZoomDirective } from './directives/pinch-zoom.directive';
import { GlobalService } from './services/global.service';
import { UIControlConfig } from './models/ui-control-config.model';
import { UIService, UI_CONFIG } from './services/ui.service';

@NgModule({
  declarations: [
    PinchZoomDirective
  ],
  imports: [
    CommonModule,
  ],
  providers:[

  ],
  exports:[
    CommonModule,
    PinchZoomDirective
  ]
})
export class UIBuilderModule {
  static forRoot(config?: UIControlConfig): ModuleWithProviders<UIBuilderModule> {
    return {
      ngModule: UIBuilderModule,
      providers: [
        { provide: UI_CONFIG, useValue: config, multi: true },
        UIService
      ],
    };
  }

  static forChild(config?: UIControlConfig): ModuleWithProviders<UIBuilderModule> {
    return {
      ngModule: UIBuilderModule,
      providers: [
        { provide: UI_CONFIG, useValue: config, multi: true },
      ],
    };
  }

  constructor(uiService: UIService, @Optional() @Inject(UI_CONFIG) configs: UIControlConfig[] = []) {
    if (!configs) {
      return;
    }
    configs.forEach((config) => uiService.register(config));
  }
}
