import { AfterViewInit, Component, ComponentRef, EventEmitter, Inject, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PageOptions } from '../models/page-options.model';
import { PAGE_DEFAULT_OPTION } from '../models/page-default.token';
import { UIService } from '../services/ui.service';
import { FieldControl, FormControl } from '../models/form.model';
import { LayoutDirective } from '../directives/layout.directive';
import { PageEvent } from '../models/page-event.model';



@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements AfterViewInit {
  @Input() formOption!: FormControl;
  @Output() event: EventEmitter<PageEvent> = new EventEmitter();
  @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;



  constructor(
    @Inject(PAGE_DEFAULT_OPTION) private  defaultConfig: PageOptions,
    private hostContainerRef: ViewContainerRef,
    private uiService: UIService) {
      console.log(defaultConfig);
  }

  ngAfterViewInit(): void
  {
    debugger
    this.render(this.formOption);
  }

  render(form: FormControl = this.formOption) {
    if(form.layout) {
      const controlUI = this.uiService.getControl(form.layout, "");
      form.layoutRef = this.createComponent<LayoutDirective>(this.viewContainerRef, controlUI.component as Type<LayoutDirective>);
    }

    form.controls.forEach( control =>{
      if(control instanceof FormControl) {
        this.render(control);
      } else if(control instanceof FieldControl && control.options.typeName) {
        const controlUI = this.uiService.getControl(control.options.typeName, control.options.packageName);
        if(form.layoutRef && control.view) {
          if(form.layoutRef.instance.views[control.view]) {
            this.createComponent(form.layoutRef.instance.views[control.view], controlUI.component);
          } else {
            console.error(`In layout '${form.layout}' not found view with name '${control.view}'.`);
          }
        } else {
          this.createComponent(this.viewContainerRef, controlUI.component);
        }
      }
    });
  }


  private createComponent<T = unknown>(viewContainerRef: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    return viewContainerRef.createComponent<T>(component);
  }



}
