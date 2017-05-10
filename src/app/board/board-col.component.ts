import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { BoardSpace } from '../models/board-space';
@Component({
  selector: 'app-board-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <span [innerHTML]="col.generateView()">
  </span>
  `
})
export class BoardColComponent {
  @Input('col') col: BoardSpace;
}
