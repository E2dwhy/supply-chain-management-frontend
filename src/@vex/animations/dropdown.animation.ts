<<<<<<< HEAD
import { animate, state, style, transition, trigger } from '@angular/animations';

export const dropdownAnimation = trigger('dropdown', [
  state('false', style({
    height: 0,
    opacity: 0
  })),
  state('true', style({
    height: '*',
    opacity: 1
  })),
  transition('false <=> true', animate('300ms cubic-bezier(.35, 0, .25, 1)'))
]);
=======
import { animate, state, style, transition, trigger } from '@angular/animations';

export const dropdownAnimation = trigger('dropdown', [
  state('false', style({
    height: 0,
    opacity: 0
  })),
  state('true', style({
    height: '*',
    opacity: 1
  })),
  transition('false <=> true', animate('300ms cubic-bezier(.35, 0, .25, 1)'))
]);
>>>>>>> 98d0c17... feat: push base  code to repository
