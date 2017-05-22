import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BoardSpace } from '../models/board-space';

@Component({
  selector: 'app-board-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <app-board-col [col]="col" *ngFor="let col of row;"></app-board-col>
    </div>
  `
})
export class BoardRowComponent {

  @Input('row') row: any;
}
