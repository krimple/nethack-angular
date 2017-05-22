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

import { BoardSpace } from '../models/board-space';
import { MovementDirection } from '../models/movement-direction.enum';
import { Observable } from 'rxjs/Observable';
import { SpaceType } from '../models/space-type.enum';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-board',
  template: `
    <h1>Board</h1>
    <div>
      <span><b>X</b></span>&nbsp;<span [innerHTML]="(board$ | async).get('x')"></span>
      <span><b>Y</b></span>&nbsp;<span [innerHTML]="(board$ | async).get('y')"></span>
    </div>
    <app-board-row 
          [row]="row" 
          *ngFor="let row of (board$ | async).get('boardSpaces').toJS(); trackBy: trackByFn;">
    </app-board-row>
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
export class BoardComponent {
  board$: Observable<Immutable.List<Immutable.List<BoardSpace>>>;

  constructor(private store: Store<any>, private zone: NgZone, private detector: ChangeDetectorRef) {
    const self = this;
    this.board$ = this.store.select('board');
  }

  trackByFn(index, row) {
    return index;
  }

  @HostListener('window:keypress', ['$event']) processKeyStroke(event: any) {
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
        this.store.dispatch(new MovementAction(direction));
    }
  }
}
