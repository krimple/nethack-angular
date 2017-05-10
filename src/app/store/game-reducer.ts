
import { Action } from '@ngrx/store';
import { GameState } from './game.state';
import { BoardActionTypes, SetTileAction } from './board-actions';
import { SpaceType } from '../models/space-type.enum';

export const initialState = new GameState();

export function gameReducer(state: GameState = initialState, action: Action): GameState {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      const spaces = state.board.boardSpaces;
      spaces[action.payload.row][action.payload.col] = SpaceType[SpaceType[action.payload.spaceType]];
      return Object.assign({}, state, { board: Object.assign({}, state.board, { boardSpaces: spaces}) });
    default:
      return state;
  }
}

