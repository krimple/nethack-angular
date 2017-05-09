import {SpaceType, SpaceTypeValues} from './space-type.enum';
export class Board {
  boardSpaces: SpaceType[][] = [];

  constructor(public cols: number, public rows: number) {
    for (let i = 0; i < rows; i++) {
      this.boardSpaces[i] = [];
      for (let j = 0; j < cols; j++) {
        const randomValue = Math.floor(Math.random() * 4);
        this.boardSpaces[i][j] = SpaceType[SpaceType[randomValue]];
      }
    }
    console.log('board spaces : ');
    console.log(JSON.stringify(this.boardSpaces));
  }
}
