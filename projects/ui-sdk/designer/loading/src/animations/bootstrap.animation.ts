import { animate, state, style, transition, trigger } from "@angular/animations";

export const RotateSpinner =  trigger('rotate', [
    state('step1', style({transform: 'rotate(360)'})),
    state('step2', style({transform: 'rotate(-360)'})),
    transition('* => *', animate('1600ms ease-in'))
]);