import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition, ScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { MenuOption } from '../public-api';
import { menuAnimations } from './menu.animation';
import { BaseControlElement, NgClass } from '@ui-core/core';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations:[ menuAnimations.transformPanel ]
})
export class MenuComponent extends BaseControlElement implements AfterViewInit, OnDestroy {
  @Input() option: MenuOption = new MenuOption();

  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Overlay pane containing the options. */
  @ViewChild(CdkConnectedOverlay)
  protected _overlayDir!: CdkConnectedOverlay;

  _overlayPanelClass: string | string[] = this.option?.overlayClass || '';

  /** Emits when the panel element is finished transforming in. */
  readonly _panelDoneAnimatingStream = new Subject<string>();

  /** Strategy that will be used to handle scrolling while the select panel is open. */
  // _scrollStrategy: ScrollStrategy = ;

  /** Ideal origin for the overlay panel. */
  _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** Width of the overlay panel. */
  _overlayWidth: number | string = '';

  _panelClass?: NgClass;

  _positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: 'menu-panel-above',
    },
  ];

  constructor(
    protected _viewportRuler: ViewportRuler,
    public _elementRef: ElementRef,
    protected _changeDetectorRef: ChangeDetectorRef,) {
    super();
    this.initControl('menu');
  }

  ngOnInit() {
    // We need `distinctUntilChanged` here, because some browsers will
    // fire the animation end event twice for the same animation. See:
    // https://github.com/angular/angular/issues/24084
    this._panelDoneAnimatingStream
      .pipe(distinctUntilChanged(), takeUntil(this._destroy))
      .subscribe(() => this._panelDoneAnimating(this.panelOpen));

      this._viewportRuler
      .change()
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        if (this.panelOpen) {
          this._overlayWidth = this._getOverlayWidth();
          this._changeDetectorRef.detectChanges();
        }
      });
  }

  ngAfterViewInit() {
  }

  refresh() {
    this._overlayWidth = this.option.overlayWidth ?? '';
    this._panelClass = this.option.overlayClass;
  }

  /** Gets how wide the overlay panel should be. */
  private _getOverlayWidth() {
    const refToMeasure =
      this._preferredOverlayOrigin instanceof CdkOverlayOrigin
        ? this._preferredOverlayOrigin.elementRef
        : this._preferredOverlayOrigin || this._elementRef;
    return refToMeasure.nativeElement.getBoundingClientRect().width;
  }

  /** Called when the overlay panel is done animating. */
  protected _panelDoneAnimating(isOpen: boolean) {
    this.openedChange.emit(isOpen);
  }

  /** Whether the panel is allowed to open. */
  protected _canOpen(): boolean {
    return !this._panelOpen && !this.option.disabled && !!this.option?.itemDataSource ;
  }

   /** Toggles the overlay panel open or closed. */
   toggle(): void {
    console.log('ddd');

    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this._canOpen()) {
      this._overlayWidth = this._getOverlayWidth();
      this._panelOpen = true;
      this._changeDetectorRef.markForCheck();
    }
  }

   /** Closes the overlay panel and focuses the host element. */
   close(): void {
    if (this._panelOpen) {
      this._panelOpen = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Callback that is invoked when the overlay panel has been attached.
   */
  _onAttached(): void {
    this._overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      this._changeDetectorRef.detectChanges();
    });
  }

  /** Handles all keydown events on the select. */
  _handleKeydown(event: KeyboardEvent): void {
    if (!this.option.disabled) {
    }
  }

}
