import {Action} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {SpaceType} from '../models/space-type.enum';

export const BoardActionTypes = {
  MOVEMENT: 'MOVEMENT',
  SET_TILE: 'SET_TILE'
};

export class MovementAction implements Action {
  type = BoardActionTypes.MOVEMENT;
  constructor(public direction: MovementDirection) { }
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
