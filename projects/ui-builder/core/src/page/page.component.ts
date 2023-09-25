import { Component, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { PageOptions } from '../models/page-options.model';
import { PAGE_DEFAULT_OPTION } from '../models/page-default.token';

@Component({
  selector: 'lib-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() pageOption: PageOptions = this.defaultConfig;

  @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  
  constructor(@Inject(PAGE_DEFAULT_OPTION) private  defaultConfig: PageOptions) {
  }


}
