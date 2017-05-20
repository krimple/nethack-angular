import {NgModule} from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import { boardReducer } from './board-reducer';

const store = StoreModule.provideStore({ board: boardReducer });
@NgModule({
  imports: [
    store,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class GameStoreModule { }
