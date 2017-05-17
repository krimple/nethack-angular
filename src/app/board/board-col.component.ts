import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { BoardSpace } from '../models/board-space';
@Component({
  selector: 'app-board-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <i [ngClass]="['gi', 'gi-2x', col.generateView()]"></i>
  `,
  styles: [`
   :host {
      width: auto;
      margin: 0;   
      padding: 0;       
   }
   
   i {
     margin: 0;
     padding: 0; 
   }
  `]
})
export class BoardColComponent {
  @Input('col') col: BoardSpace;
}
