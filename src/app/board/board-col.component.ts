import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SpaceType} from '../models/space-type.enum';
@Component({
  selector: 'app-board-col',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
   <span class="col" [ngSwitch]="col">
      <b *ngSwitchCase="types.EMPTY">*</b> 
      <b *ngSwitchCase="types.PLAYER">P</b>
      <b *ngSwitchCase="types.MONSTER">M</b>
      <b *ngSwitchCase="types.ARROW">x</b>
      <b *ngSwitchDefault>?</b>
  </span>
  `
})
export class BoardColComponent {
  types = SpaceType;
  @Input('col') col: SpaceType;
}
