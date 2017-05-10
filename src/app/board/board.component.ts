import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, NgZone,
  OnInit
} from '@angular/core';
import { environment } from '../../environments/environment';
import {Store} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import { MovementAction, SetTileAction } from '../store/board-actions';
import {SpaceType} from '../models/space-type.enum';
import {  GameState } from '../store/game.state';
import { Observable } from 'rxjs/Observable';
import { Board } from '../models/board';

@Component({
  selector: 'app-board',
  template: `
    <div *ngIf="board; else loading">
      <h1>Board</h1>
      <app-board-row [row]="row" *ngFor="let row of board.boardSpaces;"></app-board-row>
    </div>
    <ng-template #loading>Board loading...</ng-template>
  `,
  styles: [`
  :host {
      font-family: monospace;
      font-size: 2em;
  }
  span.col {
      margin: 1px;
      padding: 0px;
  }
  .row {
    margin: 1px;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, AfterViewInit {
  board: Board;

  constructor(private store: Store<any>, private zone: NgZone, private detector: ChangeDetectorRef) {
    const self = this;
    this.store.subscribe((gameState: GameState) => {
        self.board = gameState.board;
        self.detector.markForCheck();
      });
    setTimeout(() => {
     setInterval(() => {
      const row = Math.floor(Math.random() * environment.rows);
      const col = Math.floor(Math.random() * environment.cols);
      const randomValue = Math.floor(Math.random() * 4);
      zone.run(() => {
       self.store.dispatch(new SetTileAction(row, col, SpaceType[SpaceType[randomValue]]));
       self.detector.detectChanges();
      });
    }, 50);
   }, 2000);
}

  @HostListener('window:keyup', ['$event']) processKeyStroke(event: any) {
    console.dir(event.key);
    let direction: MovementDirection = null;
    switch (event.key) {
      case 'k':
        direction = MovementDirection.UP;
        break;
      case 'j':
        direction = MovementDirection.DOWN;
        break;
      case 'h':
        direction = MovementDirection.LEFT;
        break;
      case 'l':
        direction = MovementDirection.RIGHT;
        break;
    }
    if (direction !== null) {
      console.log('dispatching');
      console.dir(direction);
      this.store.dispatch(new MovementAction(direction));
    }
  }


  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
