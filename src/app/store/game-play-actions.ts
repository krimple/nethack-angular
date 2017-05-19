import { Action } from '@ngrx/store';

export const GamePlayActionTypes = {
  TIME_PASSES: 'TIME_PASSES'
};

export class TimePassesAction implements Action {
  type = GamePlayActionTypes.TIME_PASSES;
  constructor() { }
}
