import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SpaceType} from '../models/space-type.enum';
@Component({
  selector: 'app-board-row',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="row">
      <app-board-col [col]="col" *ngFor="let col of row"></app-board-col>
    </div>
  `
})
export class BoardRowComponent {
  @Input('row') row: SpaceType[];
}

