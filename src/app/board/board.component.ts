import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone,
  OnInit, ViewChild
} from '@angular/core';
import { environment } from '../../environments/environment';
import {Store} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import { MovementAction, SetTileAction } from '../store/board-actions';
import {SpaceType} from '../models/space-type.enum';
import {  GameState } from '../store/game.state';
import { Observable } from 'rxjs/Observable';
import { Board } from '../models/board';

@Component({
  selector: 'app-board',
  template: `
    <div *ngIf="board; else loading">
      <h1>Board</h1>
      <canvas class="board" 
              #boardCanvas width="{{ 100 * env.cols}}" height="{{ 100 * env.rows}}"></canvas>
      <canvas class="gameplay"
              #gameplayCanvas
              width="{{ 100 * env.cols }}" height="{{ 100 * env.cols }}"></canvas>
              
    </div> 
    <ng-template #loading>Board loading...</ng-template>
  `,
  styles: [`
    canvas.board {
      border: 1px solid black;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
    }
    
    canvas.gameplay {
      position: absolute;
      top: 0; 
      left: 0;
      z-index: 2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChild('boardCanvas') boardCanvas: ElementRef;
  @ViewChild('gameplayCanvas') gameplayCanvas: ElementRef;
  env = environment;
  board: Board;

  constructor(private store: Store<any>, private zone: NgZone,
              private detector: ChangeDetectorRef) {

    const self = this;
    this.store.subscribe((gameState: GameState) => {
      self.board = gameState.board;
      self.detector.detectChanges();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.paintBoard();
    this.paintGamePlay();
  }

  paintBoard() {
    const graphicsContext = this.boardCanvas.nativeElement.getContext('2d');
    // paint rows
    for (let i = 0; i < environment.rows; i++) {
      graphicsContext.moveTo(0, i * 100);
      graphicsContext.lineTo(environment.cols * 100, i * 100);
    }

    for (let i = 0; i < environment.cols; i++) {
      graphicsContext.moveTo(i * 100, 0);
      graphicsContext.lineTo(i * 100, environment.cols * 100);
    }

    graphicsContext.strokeStyle = 'black';
    graphicsContext.stroke();
 }

  getCrazy() {
    const self = this;
    setTimeout(() => {
     setInterval(() => {
      const row = Math.floor(Math.random() * environment.rows);
      const col = Math.floor(Math.random() * environment.cols);
      const randomValue = Math.floor(Math.random() * 4);
      self.zone.run(() => {
       self.store.dispatch(new SetTileAction(row, col, SpaceType[SpaceType[randomValue]]));
       self.detector.detectChanges();
      });
    }, 50);
   }, 2000);
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

        break;
    }
    if (direction !== null) {
      console.log('dispatching');
      console.dir(direction);
      this.store.dispatch(new MovementAction(direction));
    }
  }

  paintGamePlay() {
     const graphicsContext = this.gameplayCanvas.nativeElement.getContext('2d');
     graphicsContext.fillRect(15, 15, 300, 500);
  }


}
