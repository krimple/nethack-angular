import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardSpace } from '../models/board-space';
@Component({
  selector: 'app-board-row',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="row">
      <app-board-col [col]="col" *ngFor="let col of row; trackBy: indexOf"></app-board-col>
    </div>
  `
})
export class BoardRowComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.dir(changes);
  }

  @Input('row') row: BoardSpace[];

  indexOf(arg1: any, arg2: BoardSpace) {
    return arg2.indexOf();
  }
}

