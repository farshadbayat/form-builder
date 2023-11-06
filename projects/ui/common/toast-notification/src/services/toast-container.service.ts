import {
  ApplicationRef,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastContainerComponent } from '../components/toast-container/toast-container.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

const TOAST_CONTAINER_CLASS_NAME = 'toast-container';

@Injectable()
export class ToastContainerService implements OnDestroy {
  private renderer: Renderer2;
  private containerEl!: HTMLElement | null;
  private componentRef!: ComponentRef<ToastContainerComponent> | null;


  overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    hasBackdrop: false
    });

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private injector: Injector,
    private overlay: Overlay,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get ref(): ComponentRef<ToastContainerComponent> {
    if (!this.componentRef) {
      this._attach();
    }
    return this.componentRef as ComponentRef<ToastContainerComponent>;
  }

  private get containerElement(): HTMLElement {
    if (!this.containerEl) {
      this.containerEl = this.renderer.createElement('div');
      this.renderer.addClass(this.containerEl, TOAST_CONTAINER_CLASS_NAME);
      this.renderer.appendChild(this.document.body, this.containerEl);
    }
    return this.containerEl as HTMLElement;
  }

  ngOnDestroy() {
    this._detach();
    this._destroyContainer();
  }

  private _attach() {
    this._detach();
    // this.componentRef = this.globalService.rootViewContainerRef.createComponent(ToastContainerComponent,{ injector: this.injector})
    // // const componentFactory = this.factoryResolver.resolveComponentFactory(ToastContainerComponent);
    // // this.componentRef = componentFactory.create(this.injector);
    // const hostView = this.componentRef.hostView as EmbeddedViewRef<any>;
    // const rootNode = hostView.rootNodes[0] as HTMLElement;
    // this.renderer.appendChild(this.containerElement, rootNode);
    this.componentRef = this.overlayRef.attach(new ComponentPortal(ToastContainerComponent));
  }

  private _detach() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private _destroyContainer() {
    if (this.containerEl && this.containerEl.parentNode) {
      this.renderer.removeChild(this.containerEl.parentNode, this.containerEl);
      this.containerEl = null;
    }
  }
}
