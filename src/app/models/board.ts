import {SpaceType, SpaceTypeValues} from './space-type.enum';

import { BoardSpace } from './board-space';
import { List } from 'immutable';

export class Board {
  boardSpaces: any;

  constructor(public rows: number, public cols: number) {
    this.emptyBoardPopulator();
  }

  emptyBoardPopulator() {
    const boardSpaces: BoardSpace[][] = [];

    for (let i = 0; i < this.rows; i++) {
      boardSpaces[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const randomValue = Math.floor(Math.random() * 4);
        boardSpaces[i][j] = new BoardSpace(SpaceType.EMPTY);
      }
    }
    this.boardSpaces = List.of(boardSpaces);
   }
  randomPopulator() {
    for (let i = 0; i < this.rows; i++) {
      this.boardSpaces[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const randomValue = Math.floor(Math.random() * 4);
        this.boardSpaces[i][j] = new BoardSpace(SpaceType[SpaceType[randomValue]]);
      }
    }
    console.log('board spaces : ');
    console.log(JSON.stringify(this.boardSpaces));
  }
}
