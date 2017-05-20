import * as Immutable from 'immutable';

import { Action, Store } from '@ngrx/store';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnInit,
} from '@angular/core';
import { MovementAction, SetTileAction } from '../store/board-actions';

import { Board } from '../models/board';
import { BoardSpace } from '../models/board-space';
import { GameState } from '../store/game.state';
import {MovementDirection} from '../models/movement-direction.enum';
import { Observable } from 'rxjs/Observable';
import {SpaceType} from '../models/space-type.enum';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-board',
  template: `
    <h1>Board</h1>
    <app-board-row 
          [row]="row" 
          *ngFor="let row of (board$ | async).toJS()"></app-board-row>
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
  board$: Observable<Immutable.List<Immutable.List<BoardSpace>>>;

  constructor(private store: Store<any>, private zone: NgZone, private detector: ChangeDetectorRef) {
    const self = this;
    this.board$ = this.store.select('board');
    this.store.dispatch(new SetTileAction(8, 8, SpaceType.PLAYER));
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
