import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ripple]'
})
export class RippleDirective implements OnInit, AfterViewInit  {
  @Input() ripple: boolean = true;
  @Input() rippleColor: string = 'rgba(88, 88, 88, 0.7)';
  @HostListener('mousedown', ['$event']) onMousedown(e: MouseEvent){
    console.log(e);
    
    if (this.player) {
      this.player.destroy();
    }
    
    const metadata = this.rippleIn();

    const factory = this.builder.build(metadata);
    const player = factory.create(this.createRipple(e));

    player.play();
  }
  
  
  private player: AnimationPlayer | null = null;

  constructor(
    private builder: AnimationBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit(): void {
  }

  createRipple(e: MouseEvent): Element {
    
    const button = e.currentTarget as HTMLElement;
    const circle: HTMLSpanElement = this.document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    circle.style.setProperty('pointer-events', 'none');
    circle.style.setProperty('position', 'absolute');
    circle.style.setProperty('border-radius', '50%');
    circle.style.setProperty('transform', 'scale(0)');
    circle.style.setProperty('background-color', this.rippleColor);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add('ripple');

    this.renderer.appendChild(button, circle);
    return circle;
  }

  ngOnInit(): void {
  }

  private rippleIn(): AnimationMetadata[] {
    return [
      style({ transform: 'scale(0)', opacity: 1 }),
      animate('600ms linear', style({ transform: 'scale(4)', opacity: 0 })),
    ];
  }  

}
