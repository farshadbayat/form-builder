import {
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import { Toast } from '../toast';


@Directive({
  selector: '[toastContent]',
})
export class ToastContentDirective implements OnInit, OnDestroy {

  @Input() toast: Toast = new Toast({  }, );
  private _componentRef: ComponentRef<any> | null = null;

  constructor(
      private _viewContainerRef: ViewContainerRef,
      private _injector: Injector
  ) {
  }

  ngOnInit(): void {
    this._componentRef = this._viewContainerRef.createComponent(this.toast.component as Type<any>,{ injector: this._injector})    
    this._componentRef.instance.toast = this.toast;
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }
}
