import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from './ripple/ripple.directive';

// https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RippleDirective
  ],
  exports:[
    CommonModule,
    RippleDirective
  ]
})
export class RippleModule { }
