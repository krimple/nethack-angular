import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import * as actions from './board-actions';

import { Actions, Effect, toPayload } from '@ngrx/effects';

import { BoardActions } from 'app/store/board-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class BoardEffects {
    @Effect() beginMissileAnimation$ = this.actions$
                          .ofType(actions.BoardActionTypes.FIRE_MISSILE)
                          .switchMap(() => Observable.of(new actions.AnimateMissileAction(environment.cols - 3)));
    
    @Effect() animateMissileSpace$ = this.actions$
              .ofType(actions.BoardActionTypes.ANIMATE_MISSILE)
              .map(toPayload)
              .switchMap((spacesLeft) => {
                if (spacesLeft > 0) {
                  return Observable
                    .timer(environment.animateTimerTicks)
                    .map(() => new actions.AnimateMissileAction(spacesLeft - 1));
                  } else {
                    return Observable.of(new actions.DestroyMissileAction());
                  }
               });

        constructor(private actions$: Actions) { }
}