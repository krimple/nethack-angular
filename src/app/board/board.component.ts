import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef, Component, ElementRef,
  HostListener, NgZone, OnChanges, ViewChild, ViewChildren, QueryList, OnInit
} from '@angular/core';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {MovementDirection} from '../models/movement-direction.enum';
import {Board} from '../models/board';
import {Player} from 'app/models/player';
import {SetDirectionAction} from '../store/player-actions';
import {TimePassesAction} from "../store/game-play-actions";

@Component({
  selector: 'app-board',
  template: `
    <h1>Board</h1>
    <canvas class="gameplay"
            #canvas
            [width]="100 * env.cols"
            [height]="100 * env.cols"></canvas>
    {{ player | json }}
  `,
  styles: [`
    canvas.gameplay {
      position: absolute;
      top: 150px;
      left: 0;
      border: 1px solid black;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BoardComponent implements /*OnChanges,*/ AfterViewInit {
  @ViewChild('canvas') canvas;
  env = environment;
  board: Board;
  player: any;

  constructor(private store: Store<any>) { }

  ngAfterViewInit() {
    const self = this;
    this.store.select('player').subscribe((player: Player) => {
      // avoid mutating the data in the view after initialized - do it in another chnage cycle
      setTimeout(() => {
        this.player = player;
        this.paintGamePlay();
      });
    });

    setInterval(() => {
      self.store.dispatch(new TimePassesAction());
    }, 300);
  }

  paintGamePlay() {
    if (this.player) {
      const graphicsContext = this.canvas.nativeElement.getContext('2d');
      graphicsContext.clearRect(0, 0, this.env.cols * 100, this.env.rows * 100);
      graphicsContext.fillRect(this.player.x * 100, this.player.y * 100, 10, 10);
    }
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
        direction = MovementDirection.RIGHT;
        break;
      case 's':
        direction = MovementDirection.STOP;
        break;
    }
    if (direction !== null) {
      console.log('dispatching');
      console.dir(direction);
      this.store.dispatch(new SetDirectionAction(direction));
    }
  }
}
