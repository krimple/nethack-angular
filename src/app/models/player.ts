import { Position } from './position';
import {Board} from './board';
import {MovementDirection} from './movement-direction.enum';

export class Player {
  constructor(private board: Board, public name: number, public position: Position) { }

  move(direction: MovementDirection) {
    console.log(`moving to ${direction}`);
  }
}
