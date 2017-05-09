import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Board} from '../models/board';

import {Store} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {MovementAction} from '../store/board-actions';
import {SpaceType} from '../models/space-type.enum';

@Component({
  selector: 'app-board',
  template: `
    <div *ngIf="board; else loading">
      <app-board-row [row]="row" *ngFor="let row of board.boardSpaces"></app-board-row>
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
  `]
})
export class BoardComponent implements OnInit, AfterViewInit {
  board: Board;
  rows = 20;
  cols = 25;

  constructor(private store: Store<any>) {
    this.board = new Board(this.cols, this.rows);
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
    console.log(`board configured.`);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      const randomValue = Math.floor(Math.random() * 4);
      const newType = SpaceType[SpaceType[randomValue]];
      this.store.dispatch(new SetTileAction(row, col, newType));
    }, 100);
  }

}
