import { Position } from './position';
import { Board } from './board';
import {MovementDirection} from './movement-direction.enum';
import { environment } from '../../environments/environment';

export class Player {
  private velocity: number;
  private direction: MovementDirection;
  private maxcols = environment.cols;
  private maxrows = environment.rows;

  constructor(public name: number, public position: Position) {
    this.direction = 0;
    this.velocity = 0;
  }

  move(direction: MovementDirection) {
    if (this.velocity === 0) {
      this.velocity = 1;
    } else if (MovementDirection[this.direction] === MovementDirection[direction]) {
      this.velocity += 1;
    } else if (this.opposite(this.direction)) {
      this.velocity -= 1;
    }
    this.applyVelocity();
    // todo - other directions
    console.log(`moving to ${direction}`);
  }

  private opposite(direction: MovementDirection) {
    switch (this.direction) {
      case MovementDirection.UP:
        return MovementDirection[this.direction] === MovementDirection.DOWN.toString();
      case MovementDirection.DOWN:
        return MovementDirection[this.direction] === MovementDirection.UP.toString();
      case MovementDirection.LEFT:
        return MovementDirection[this.direction] === MovementDirection.RIGHT.toString();
      case MovementDirection.RIGHT:
        return MovementDirection[this.direction] === MovementDirection.LEFT.toString();
      default:
        return false;
    }
  }

  private applyVelocity() {
     // defaults
     let newcol = this.position.column;
     let newrow = this.position.row;

     switch (this.direction) {
      case MovementDirection.UP:
        newcol = ((newcol - 1 > 0) ? newcol - 1 : this.maxcols);
        break;
      case MovementDirection.DOWN:
        newcol = ((newcol + 1 < this.maxcols) ? newcol + 1 : 0);
        break;
      case MovementDirection.LEFT:
        newrow = ((newrow - 1 > 0) ? newrow - 1 : this.maxrows);
        break;
      case MovementDirection.RIGHT:
        newrow = ((newrow + 1 < this.maxrows) ? newrow + 1 : 0);
        break;
    }
    this.position = new Position(newrow, newcol);
  }
}
