import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BoardSpace } from '../models/board-space';

@Component({
  selector: 'app-board-row',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="row">
      <app-board-col [col]="col" *ngFor="let col of row;"></app-board-col>
    </div>
  `
})
export class BoardRowComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
  }

  @Input('row') row: any;
}
