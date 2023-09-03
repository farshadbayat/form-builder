import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Toast } from '../../toast';


@Component({
  templateUrl: './basic-toast-content.component.html',
  styleUrls: ['./basic-toast-content.component.scss'],
})
export class BasicToastContentComponent {
  @Input() toast!: Toast;
  textList: string[] = [];

  get getTextList(): string[] {
    return Array.isArray(this.toast.text) ? this.toast.text as string[] : [this.toast.text as string];
  }

}
