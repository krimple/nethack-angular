import {NgModule} from '@angular/core';
import {StoreModule, combineReducers} from '@ngrx/store';
import {boardReducer} from '../store/board-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const store = StoreModule.provideStore({board: boardReducer})
@NgModule({
  imports: [
    store,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class GameStoreModule { }
