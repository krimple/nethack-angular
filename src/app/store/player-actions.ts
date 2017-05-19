import {Action} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';

export const PlayerActionTypes = {
  SET_DIRECTION: 'SET_DIRECTION',
  MOVEMENT: 'MOVEMENT'
};

export class SetDirectionAction implements Action {
  type = PlayerActionTypes.SET_DIRECTION;
  payload: any;
  constructor(public direction: MovementDirection) {
    this.payload = {
      direction: direction
    };
  }
}
