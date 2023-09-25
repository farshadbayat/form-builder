import { animate, animateChild, AnimationTriggerMetadata, query, state, style, transition, trigger } from "@angular/animations";

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

export const MenuSlideContentAnimation1 = trigger('slideContent', [
    state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
    state('enter', style({ transform: 'none', opacity: 1 })),
    state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
    transition('* => *', animate(ANIMATION_TIMINGS)),
]);

export const MenuSlideContentAnimation2 = trigger('slideContent', [
    state('void', style({
        height: '0',
        opacity: '0',
    })),
    state('enter', style({
        height: '*',
        opacity: '1',
    })),
    transition('* => *', animate(ANIMATION_TIMINGS)),
]);



export const selectAnimations: {
  /**
   * @deprecated No longer being used. To be removed.
   * @breaking-change 12.0.0
   */
  readonly transformPanelWrap: AnimationTriggerMetadata;
  readonly transformPanel: AnimationTriggerMetadata;
} = {
  /**
   * This animation ensures the select's overlay panel animation (transformPanel) is called when
   * closing the select.
   * This is needed due to https://github.com/angular/angular/issues/23302
   */
  transformPanelWrap: trigger('transformPanelWrap', [
    transition('* => void', query('@transformPanel', [animateChild()], {optional: true})),
  ]),

  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: trigger('transformPanel', [
    state(
      'void',
      style({
        opacity: 0,
        transform: 'scale(1, 0.8)',
      }),
    ),
    transition(
      'void => showing',
      animate(
        '120ms cubic-bezier(0, 0, 0.2, 1)',
        style({
          opacity: 1,
          transform: 'scale(1, 1)',
        }),
      ),
    ),
    transition('* => void', animate('100ms linear', style({opacity: 0}))),
  ]),
};