import {Action} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {SpaceType} from '../models/space-type.enum';

export const BoardActionTypes = {
  MOVEMENT: 'MOVEMENT',
  SET_TILE: 'SET_TILE',
  FIRE_MISSILE: 'FIRE_MISSILE',
  ANIMATE_MISSILE: 'ANIMATE_MISSILE',
  DESTROY_MISSILE: 'DESTROY_MISSILE'
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

export class FireMissileAction implements Action {
  type = BoardActionTypes.FIRE_MISSILE;
}

export class AnimateMissileAction implements Action {
  payload: number;
  type = BoardActionTypes.ANIMATE_MISSILE;
  constructor(spacesLeft: number) {
    this.payload = spacesLeft;
  }
}

export class DestroyMissileAction implements Action {
  type = BoardActionTypes.DESTROY_MISSILE;
}

export type BoardActions = AnimateMissileAction | DestroyMissileAction | FireMissileAction | MovementAction | SetTileAction;