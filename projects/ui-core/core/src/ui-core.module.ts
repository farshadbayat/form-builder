import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIService, UI_CONFIG } from './services/ui.service';
import { UIPackage } from './models/ui-package.model';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
  ],
  providers:[

  ],
  exports:[
    CommonModule,
    PageComponent
  ]
})
export class UICoreModule {
  static forRoot(config?: UIPackage): ModuleWithProviders<UICoreModule> {
    return {
      ngModule: UICoreModule,
      providers: [
        { provide: UI_CONFIG, useValue: config, multi: true },
        UIService
      ],
    };
  }

  static forChild(config?: UIPackage): ModuleWithProviders<UICoreModule> {
    return {
      ngModule: UICoreModule,
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
