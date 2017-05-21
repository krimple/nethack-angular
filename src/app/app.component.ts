import {Component, OnInit} from '@angular/core';

import { SetTileAction } from './store/board-actions';
import { SpaceType } from './models/space-type.enum';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<any>)  { }

  ngOnInit() {
    this.store.dispatch(new SetTileAction(0, 0, SpaceType.MONSTER));
  }
}
