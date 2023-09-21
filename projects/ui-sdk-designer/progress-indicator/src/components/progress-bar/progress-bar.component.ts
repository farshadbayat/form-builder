import { Component, Input, OnInit } from '@angular/core';
import { BarOptions } from '../../models/progress-options.model';
import { ICanUpdate } from 'ui-builder';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements ICanUpdate, OnInit {
  @Input() option!: BarOptions;

  ngOnInit(): void {
  }

  public OptionUpdate() {

  };


}
