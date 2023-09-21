import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIService, UI_CONFIG } from './services/ui.service';
import { UIPackage } from './models/ui-package.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[

  ],
  exports:[
    CommonModule
  ]
})
export class UIBuilderModule {
  static forRoot(config?: UIPackage): ModuleWithProviders<UIBuilderModule> {
    return {
      ngModule: UIBuilderModule,
      providers: [
        { provide: UI_CONFIG, useValue: config, multi: true },
        UIService
      ],
    };
  }

  static forChild(config?: UIPackage): ModuleWithProviders<UIBuilderModule> {
    return {
      ngModule: UIBuilderModule,
      providers: [
        { provide: UI_CONFIG, useValue: config, multi: true },
      ],
    };
  }

  constructor(uiService: UIService, @Optional() @Inject(UI_CONFIG) configs: UIPackage[] = []) {
    if (!configs) {
      return;
    }
    configs.forEach((config) => uiService.registerPackage(config));
  }
}
