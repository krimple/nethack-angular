import {SpaceType, SpaceTypeValues} from './space-type.enum';
import { BoardSpace } from './board-space';
export class Board {
  player: BoardSpace;
  boardSpaces: BoardSpace[][] = [];

  constructor(public rows: number, public cols: number) {
    this.buildBoard();
    this.placePlayer(4, 4);
  }

  buildBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.boardSpaces[i] = [];
      for (let j = 0; j < this.cols; j++) {
        // const randomValue = Math.floor(Math.random() * 4);
        // this.boardSpaces[i][j] = new BoardSpace(i, j, SpaceType[SpaceType[randomValue]]);
        this.boardSpaces[i][j] = new BoardSpace(i, j, SpaceType.EMPTY);
      }
   }
  }

  placePlayer(row?: number, col?: number) {
   const placementRow = row ? row : Math.floor(Math.random() * this.rows);
   const placementCol = col ? col : Math.floor(Math.random() * this.cols);
   // place the player
   this.player = new BoardSpace(placementRow, placementCol, SpaceType.PLAYER);
   this.boardSpaces[placementRow][placementCol] = this.player;
  }
}
