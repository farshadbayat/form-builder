import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPoint } from '../../models/point.model';


@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  @Input() location: IPoint = { x: 0, y: 0 };
  @Input() zoom: number = 100;

  @Output() event = new EventEmitter<ToolbarEvent>();
  
  ngOnInit(): void {
  }

  refresh_onClick() {
    this.event.emit({ name: 'refresh' });
  }

}


export interface ToolbarEvent{
  name: string;
  data?: any;
}