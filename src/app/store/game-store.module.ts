import {NgModule} from '@angular/core';
import {combineReducers, StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {playerReducer} from './player-reducer';


const store = StoreModule.provideStore({ player: playerReducer });
@NgModule({
  imports: [
    store,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class GameStoreModule { }
