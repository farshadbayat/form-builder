import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CircleOptions } from '../../models/progress-options.model';
import { ICanUpdate } from 'ui-builder';
import { Subscription } from 'rxjs';


@Component({
  selector: 'progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
})
export class ProgressCircleComponent implements OnInit, OnDestroy, ICanUpdate
{
  @Input() option!: CircleOptions;

  @ViewChild('indicator', { static: false }) indicator!: ElementRef;

  private valueChangeSubscription!: Subscription;

  @HostBinding('style.width.px')
  get width()
  {
    return this.option?.diameter ?? 200;
  }

  @HostBinding('style.height.px')
  get height()
  {
    return this.option?.diameter ?? 200;
  }

  ngOnInit(): void
  {
    this.OptionUpdate();
  }

  ngOnDestroy(): void
  {
    this.valueChangeSubscription.unsubscribe();
  }


  OptionUpdate()
  {
    if (this.option.mode == 'determinate' && this.option.value$)
    {
      this.valueChangeSubscription = this.option.value$.subscribe(value =>
      {
        if (this.indicator)
        {
          value = isNaN(value) ? 100 : value;
          const r = this.indicator.nativeElement.attributes.r.value;
          const c = Math.PI * (r * 2);

          if (value < 0) { value = 0; }
          if (value > 100) { value = 100; }

          const pct = ((100 - value) / 100) * c;
          this.indicator.nativeElement.style.strokeDasharray = c+'px';
          this.indicator.nativeElement.style.strokeDashoffset = pct+'px';
          console.log(c, pct);

        }

      });
    }
  }

}
