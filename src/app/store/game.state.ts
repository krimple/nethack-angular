import {Board} from '../models/board';
import { environment } from '../../environments/environment'; import { Player } from '../models/player';
export class GameState {
  board: Board;
  constructor() {
    this.board = new Board(environment.rows, environment.cols);
  }
}
