import * as Immutable from 'immutable';

import { BoardActionTypes, MovementAction, SetTileAction } from './board-actions';

import { Action } from '@ngrx/store';
import { BoardActions } from './board-actions';
import { BoardSpace } from '../models/board-space';
import { MovementDirection } from '../models/movement-direction.enum';
import { SpaceType } from '../models/space-type.enum';
import { environment } from '../../environments/environment';

// build up default state
const boardSpaces: BoardSpace[][] = [];
for (let i = 0; i < environment.rows; i++) {
  boardSpaces[i] = [];
  for (let j = 0; j < environment.cols; j++) {
    const randomValue = Math.floor(Math.random() * 4);
    boardSpaces[i][j] = new BoardSpace(SpaceType.EMPTY);
  }
}

const immutableStateStarter = Immutable.Map({
  x: 0,
  y: 0,
  boardSpaces: Immutable.fromJS(boardSpaces)
});
export function boardReducer(state = immutableStateStarter, action: Action) {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      return setTileIn(state, <SetTileAction>action);
    case BoardActionTypes.MOVEMENT:
      return movePlayer(state, <MovementAction>action);
    default:
      return state;
  }
}

function setTileIn(state, action: SetTileAction) {
  // OH GOD, TYPESCRIPT
  const spaceType = SpaceType[action.payload.spaceType];
  const spaceTypeEnumValue = SpaceType[spaceType];
  const newSpace = new BoardSpace(spaceTypeEnumValue);
  console.dir(newSpace);
  // path to property - an array of steps
  return state.setIn(
    ['boardSpaces',
      action.payload.row,
      action.payload.col],
    newSpace);
}

function movePlayer(state, action: MovementAction) {
  const direction = action.payload.direction;
  switch (direction) {
    case MovementDirection.LEFT:
    case MovementDirection.RIGHT:
      return moveCol(state, action);
    case MovementDirection.UP:
    case MovementDirection.DOWN:
      return moveRow(state, action);
    default:
      return state;
  }
}

function moveCol(state, action) {
  const currentCol = state.get('x');
  const currentRow = state.get('y');
  const delta = action.payload.direction === MovementDirection.LEFT ? -1 : 1;
  let targetCol = currentCol + delta;
  console.log(`Moving X by ${delta} to ${targetCol}`);


  // have we wrapped?
  if (targetCol >= environment.cols ) {
    targetCol = 0;
  } else if (targetCol  < 0) {
    targetCol = environment.cols - 1;
  }

  console.log(`X by ${delta} to ${targetCol}`);
  console.log(`Changing to empty - (${currentCol}, ${currentRow}) ${JSON.stringify(state.getIn(['boardSpaces', currentRow, currentCol]))}`);
  console.log(`Changing to player- (${targetCol}, ${currentRow}) ${JSON.stringify(state.getIn(['boardSpaces', currentRow, targetCol]))}`);
  let newState = state.withMutations((theState) => {
    theState
      .setIn(['boardSpaces', currentRow, currentCol],  // wipe current space
      new BoardSpace(SpaceType.EMPTY))
      .setIn(['boardSpaces', currentRow, targetCol],   // render new space
      new BoardSpace(SpaceType.PLAYER))
      .set('x', targetCol);                             // track new X
  });

  return newState;
}
function moveRow(state, action) {
  const currentCol = state.get('x');
  const currentRow = state.get('y');
  const delta = action.payload.direction === MovementDirection.UP ? -1 : 1;
  let targetRow = currentRow + delta;
  console.log(`Moving Y by ${delta} to ${targetRow}`);


  // have we wrapped?
  if (targetRow >= environment.rows ) {
    targetRow = 0;
  } else if (targetRow  < 0) {
    targetRow = environment.rows - 1;
  }

  console.log(`Y by ${delta} to ${targetRow}`);
  console.log(`Changing to empty - (${currentCol}, ${currentRow}) ${JSON.stringify(state.getIn(['boardSpaces', currentRow, currentCol]))}`);
  console.log(`Changing to player- (${currentCol}, ${targetRow}) ${JSON.stringify(state.getIn(['boardSpaces', targetRow, currentCol]))}`);
  let newState = state.withMutations((theState) => {
    theState
      .setIn(['boardSpaces', currentRow, currentCol],  // wipe current space
      new BoardSpace(SpaceType.EMPTY))
      .setIn(['boardSpaces', targetRow, currentCol],   // render new space
      new BoardSpace(SpaceType.PLAYER))
      .set('y', targetRow);                             // track new X
  });

  return newState;
}