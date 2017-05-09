import { Pipe, PipeTransform } from '@angular/core';
import { Board } from './models/board';

@Pipe({
  name: 'boardElements'
})
export class BoardElementsPipe implements PipeTransform {

  transform(value: Board): any {
    const outputArray = new Array<number>();
    const numRows = value.rows;
    const numCols = value.cols;

    for (const val in value.boardSpaces) {
      if (value.boardSpaces.hasOwnProperty(val)) {
        outputArray.push(Number.parseInt(val));
      }
    }

    console.dir(outputArray);
    return outputArray;
  }

}
