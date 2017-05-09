
import {Action} from '@ngrx/store';
import {BoardState} from './board.state';
import {BoardActionTypes} from './board-actions';

export const initialState = new BoardState();

export function boardReducer(state: BoardState = initialState, action: Action) {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      return Object.assign({}, state, );
    default:
      return state;
  }
}

