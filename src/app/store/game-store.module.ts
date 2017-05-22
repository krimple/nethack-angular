import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './board-reducer';
import { EffectsModule } from "@ngrx/effects";
import { BoardEffects } from "app/store/board-effects";

const store = StoreModule.provideStore({ board: boardReducer });
@NgModule({
  imports: [
    store,
    EffectsModule.run(BoardEffects),
    StoreDevtoolsModule.instrumentStore()
  ]
})
export class GameStoreModule { }
