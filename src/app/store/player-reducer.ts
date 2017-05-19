import { Action } from '@ngrx/store';
import { PlayerActionTypes, SetDirectionAction } from './player-actions';
import { environment } from '../../environments/environment';
import { MovementAction } from './board-actions';
import { MovementDirection } from '../models/movement-direction.enum';
import { GamePlayActionTypes } from './game-play-actions';

const initialState = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  limitx: environment.cols,
  limity: environment.rows
};

export function playerReducer(state: any = initialState, action: Action): any {
  switch (action.type) {
    case PlayerActionTypes.SET_DIRECTION:
      return setDirection(state, <SetDirectionAction>action);
    case GamePlayActionTypes.TIME_PASSES:
      return movePlayer(state, action);
    default:
      return state;
  }
}
function setDirection(state: any, action: SetDirectionAction) {
  switch (action.payload.direction) {
    case MovementDirection.UP:
      return Object.assign({}, state, {vy: state.vy - 1});
    case MovementDirection.DOWN:
      return Object.assign({}, state, {vy: state.vy + 1});
    case MovementDirection.LEFT:
      return Object.assign({}, state, {vx: state.vx - 1});
    case MovementDirection.RIGHT:
      return Object.assign({}, state, {vx: state.vx + 1});
  }
}

function movePlayer(state: any, action: any) {
  let xpos = state.x + state.vx;
  let ypos = state.y + state.vy;

  if (xpos > state.limitx) {
    xpos = xpos - state.limitx;
  } else if (xpos < 0) {
    xpos = xpos + state.limitx;
  }
  if (ypos > state.limity) {
    ypos = ypos - state.limity;
  } else if (ypos < 0) {
    ypos = ypos + state.limity;
  }
  return Object.assign({}, state, { x: xpos, y: ypos});
}
