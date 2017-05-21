import { AppComponent } from './app.component';
import { BoardColComponent } from './board/board-col.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board/board-row.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GameStoreModule } from './store/game-store.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardRowComponent,
    BoardColComponent,
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
