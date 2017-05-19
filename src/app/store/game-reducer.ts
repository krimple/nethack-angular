
import { Action } from '@ngrx/store';
import { GameState } from './game.state';
import { BoardActionTypes, SetTileAction } from './board-actions';
import { SpaceType } from '../models/space-type.enum';
import { BoardSpace } from '../models/board-space'; import { MovementDirection } from '../models/movement-direction.enum';

export const initialState = new GameState();

export function gameReducer(state: GameState = initialState, action: Action): GameState {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      const spaces = state.board.boardSpaces;
      spaces[action.payload.row][action.payload.col] =
        new BoardSpace(action.payload.row, action.payload.col, SpaceType[SpaceType[action.payload.spaceType]]);
      return Object.assign({}, state, { board: Object.assign({}, state.board, { boardSpaces: spaces}) });
    case BoardActionTypes.MOVEMENT:
      const currentPlayerRow = state.board.player.row;
      const currentPlayerCol = state.board.player.col;
      const direction: MovementDirection = action.payload.direction;
      if (direction === MovementDirection.UP) {
        //moveUp();
      }
    default:
      return state;
  }
}


