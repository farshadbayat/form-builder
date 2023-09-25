import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AfterViewInit, Component, HostListener, Input, ViewChild, Renderer2, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { selectAnimations } from '../animations/menu.animation';
import { FieldOption } from '../models/field-option.model';

@Component({
  selector: 'field-wrapper',
  templateUrl: './field-wrapper.component.html',
  styleUrls: ['./field-wrapper.component.scss'],
  animations: [selectAnimations.transformPanel]
})
export class FieldWrapperComponent implements AfterViewInit, OnInit {
  
  @Input() option: FieldOption = new FieldOption();
  
  @ViewChild('menuTrigger',{ static: true }) menuTrigger!: CdkMenuTrigger;
  // set menuTrigger( value : CdkMenuTrigger) {
  //   if(!this.option.menu) {
  //     this.option.menu = new Menu();
  //   }
  //   this.option.menu.trigger = value;
  // }
  

  @HostListener('window:resize', ['$event.target']) 
  onResize() 
  { 
    if(this.option.menu) {
      this.option.menu.width = this.element.nativeElement.clientWidth - 6;
    }
  }

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      if(this.option.menu?.trigger && this.option.menu.trigger.isOpen()) {
        this.option.menu.trigger.close();
      }
    }
  }


  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _panelOpen = false;
  get panelOpen(): boolean {
    return this._panelOpen;
  }
  protected readonly _destroy = new Subject<void>();
  animationStart = false;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  readonly _panelDoneAnimatingStream = new Subject<string>();

  readonly _inputMenuActive = new Subject<boolean>();

  /** Handles all keydown events on the select. */
  _handleKeydown(event: KeyboardEvent): void {
    if (!this.option.disabled) {
      // this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }

  constructor(private element: ElementRef) {}
  
  ngOnInit(): void {
    this._panelDoneAnimatingStream
      .pipe(distinctUntilChanged(), takeUntil(this._destroy))
      .subscribe(() => {
        this._panelDoneAnimating(this.panelOpen);
      });
      if(this.menuTrigger && this.option.menu) {
        this.option.menu.trigger = this.menuTrigger;
      }
  }

  /** Called when the overlay panel is done animating. */
  protected _panelDoneAnimating(isOpen: boolean) {
    this.openedChange.emit(isOpen);
  }

  

  ngAfterViewInit(): void {
    this.onResize();
  }

  menu_onClick() {
    if(this.option.menu?.trigger && !this.animationStart) {
      if(this.option.menu?.trigger.isOpen()) {
        this.option.menu.trigger.close();
      } else {
        this.option.menu.trigger.open();
      }
    }
  }
}
