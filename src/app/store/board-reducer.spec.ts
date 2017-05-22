import { MovementAction, SetTileAction } from './board-actions';

import { BoardSpace } from '../models/board-space';
import { List } from 'immutable';
import { MovementDirection } from '../models/movement-direction.enum';
import { SpaceType } from '../models/space-type.enum';
import { boardReducer } from './board-reducer';
import { environment } from '../../environments/environment';

describe('Board reducer spec', () => {
  let initialState;

  beforeEach(() => {
    initialState = boardReducer(undefined, { type: 'INIT'});
  });
  it('should fill a two-dimensional array', () => {
    // fire off the initial action
    expect(initialState).toBeDefined();
  });

  it('should provide player location, and fill a boardSpaces property dimensional array with empty spaces', () => {
    const boardSpaces = initialState.get('boardSpaces').toJS();
    // bake yer noodle!  define 2d array of rows / columns with helpful ES6 fill
    // and use it to compare
    expect(boardSpaces).toEqual(
      new Array(environment.rows).fill(
              new Array(environment.cols).fill(
                new BoardSpace(SpaceType.EMPTY)))
    );
  });
  it('should allow left and right movement across the board', () => {
    let state = initialState;
    for (let i = 0; i < 49; i++) {
      const nextState = boardReducer(state, new MovementAction(MovementDirection.RIGHT));
      expect(nextState.getIn(['playerPosition', 'x'])).toBe(i % environment.cols);
      state = nextState;
    }
    // reset
    state = initialState;
    for (let i = 30; i >= 0; i--) {
      const nextState = boardReducer(state, new MovementAction(MovementDirection.LEFT));
      expect(nextState.getIn(['playerPosition', 'x'])).toBe(i % environment.cols);
      state = nextState;
    }
  });
});