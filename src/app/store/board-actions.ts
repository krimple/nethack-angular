import {Action} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {SpaceType} from '../models/space-type.enum';

export const BoardActionTypes = {
  MOVEMENT: 'MOVEMENT',
  SET_TILE: 'SET_TILE'
};

export class MovementAction implements Action {
  type = ActionTypes.MOVEMENT;
  constructor(public direction: MovementDirection) { }
}

export class SetTileAction implements Action {
  type = ActionTypes.SET_TILE;
  constructor(public row: number, public col: number, public spaceType: SpaceType) { }
}
