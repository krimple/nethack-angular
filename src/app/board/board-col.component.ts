import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { BoardSpace } from '../models/board-space';
@Component({
  selector: 'app-board-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <span [innerHTML]="col.generateView()">
  </span>
  `
})
export class BoardColComponent implements OnChanges {
  @Input('col') col: BoardSpace;
  ngOnChanges() {
    console.log(`rendering...`);
  }
}
