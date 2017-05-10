import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {gameReducer} from './game-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const store = StoreModule.provideStore(gameReducer);
@NgModule({
  imports: [
    store,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class GameStoreModule { }
