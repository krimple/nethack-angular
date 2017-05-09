import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GameStoreModule } from './store/game-store.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardElementsPipe } from './board-elements.pipe';
import { BoardColComponent } from './board/board-col.component';
import { BoardRowComponent } from './board/board-row.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardRowComponent,
    BoardColComponent,
    BoardElementsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GameStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
