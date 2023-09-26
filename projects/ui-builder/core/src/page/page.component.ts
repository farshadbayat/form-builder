import { Component, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { PageOptions } from '../models/page-options.model';
import { PAGE_DEFAULT_OPTION } from '../models/page-default.token';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'lib-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() pageOption: PageOptions = this.defaultConfig;

  @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  
  constructor(
    @Inject(PAGE_DEFAULT_OPTION) private  defaultConfig: PageOptions,
    private hostContainerRef: ViewContainerRef,
    private uiService: UIService) {
  }

  render() {
    this.pageOption.controls.forEach( control =>{
      const controlUI = this.uiService.getControl(control.controlName, control.packageName);
      this.viewContainerRef.createComponent(controlUI.component)
    });
  }
  


}
