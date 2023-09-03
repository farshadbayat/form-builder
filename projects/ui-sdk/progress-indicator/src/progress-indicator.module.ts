import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    ProgressIndicatorComponent,
    ProgressCircleComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    ProgressIndicatorComponent
  ]
})
export class ProgressIndicatorModule { }
