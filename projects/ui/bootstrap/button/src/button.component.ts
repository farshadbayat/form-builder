import { ChangeDetectionStrategy, Component, Inject, Input, inject } from '@angular/core';
import { ButtonOptions } from './models/button-options.model';
import { BUTTON_DEFAULT_OPTIONS, DEFAULT_OPTIONS } from './models/button-default.token';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { BaseControlElement, UIBuilderModule } from '@ui-core/core';
import { RippleDirective } from '@ui-common/ripple';


@Component({
  selector: 'button[flat]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  hostDirectives:[
    {
      directive: RippleDirective,
      inputs: ['ripple']
    }
  ],
  host: {
    class: 'ui-sdk-button'
  },
  imports:[
    UIBuilderModule,
    CdkMenuModule,
    OverlayModule,
    RippleDirective
  ],
  providers: [
    { provide: BUTTON_DEFAULT_OPTIONS, useValue: DEFAULT_OPTIONS}
  ]
})
export class ButtonComponent extends BaseControlElement {
  @Input() option: ButtonOptions = this.defaultConfig;
  private readonly _disabledState: RippleDirective = inject(RippleDirective, { self: true });

  constructor(@Inject(BUTTON_DEFAULT_OPTIONS) private  defaultConfig: ButtonOptions) {
    super();
    this._disabledState.ripple = true;
  }
}
