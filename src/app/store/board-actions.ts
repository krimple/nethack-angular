import {Action} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {SpaceType} from '../models/space-type.enum';

export const BoardActionTypes = {
  MOVEMENT: 'MOVEMENT',
  SET_TILE: 'SET_TILE'
};

export class MovementAction implements Action {
  payload: any;
  type = BoardActionTypes.MOVEMENT;
  constructor(direction: MovementDirection) {
      this.payload = {
        direction: direction
      };
   }
}

export class SetTileAction implements Action {
  type = BoardActionTypes.SET_TILE;
  payload: any;
  constructor(row: number, col: number, spaceType: SpaceType) {
    this.payload = {
      row: row,
      col: col,
      spaceType: spaceType
    };
  }
}

export type BoardActions = MovementAction | SetTileAction;