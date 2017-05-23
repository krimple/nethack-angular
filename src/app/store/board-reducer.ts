import * as Immutable from 'immutable';

import { AnimateMissileAction, BoardActions } from './board-actions';
import { BoardActionTypes, DestroyMissileAction, FireMissileAction, MovementAction, SetTileAction } from './board-actions';

import { Action } from '@ngrx/store';
import { BoardSpace } from '../models/board-space';
import { MovementDirection } from '../models/movement-direction.enum';
import { SpaceType } from '../models/space-type.enum';
import { environment } from '../../environments/environment';

// build up default state
const boardSpaceSeedData: BoardSpace[][] = [];
for (let i = 0; i < environment.rows; i++) {
  boardSpaceSeedData[i] = [];
  for (let j = 0; j < environment.cols; j++) {
    const randomValue = Math.floor(Math.random() * 4);
    boardSpaceSeedData[i][j] = new BoardSpace(SpaceType.EMPTY);
  }
}

const immutableStateStarter = Immutable.Map({
  playerLocation: Immutable.Map({
    col: 0,
    row: 0
  }),
  missileLocation: Immutable.Map({
    col: 0,
    row: 0,
    active: false
  }),
  boardSpaces: Immutable.fromJS(boardSpaceSeedData)
});

export function boardReducer(state = immutableStateStarter, action: Action) {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      return setTileIn(state, <SetTileAction>action);
    case BoardActionTypes.MOVEMENT:
      return movePlayer(state, <MovementAction>action);
    case BoardActionTypes.FIRE_MISSILE:
      return fireMissileInNextSpace(state, <FireMissileAction>action);
    case BoardActionTypes.ANIMATE_MISSILE:
      return animateMissile(state, <AnimateMissileAction>action);
    case BoardActionTypes.DESTROY_MISSILE:
      return destroyMissile(state, <DestroyMissileAction>action);
    default:
      return state;
  }
}

function fireMissileInNextSpace(state, action: FireMissileAction) {
  // we can't fire if we have an active missile
  if (state.getIn(['missileLocation', 'active'])) {
    return state;
  } else {
    const locationCol = state.getIn(['playerLocation', 'col']);
    const locationRow = state.getIn(['playerLocation', 'row']);
    const targetMissileLocationCol = calculateColumn(locationCol + 1);

    return state.withMutations((theState) => {
      theState
        .setIn(['boardSpaces', locationRow, targetMissileLocationCol], new BoardSpace(SpaceType.MISSILE))
        .setIn(['missileLocation', 'col'], targetMissileLocationCol)
        .setIn(['missileLocation', 'row'], locationRow)
        .setIn(['missileLocation', 'active'], true);
    });
  }
}

function setTileIn(state, action: SetTileAction) {
  // OH GOD, TYPESCRIPT
  const spaceType = SpaceType[action.payload.spaceType];
  const spaceTypeEnumValue = SpaceType[spaceType];
  const newSpace = new BoardSpace(spaceTypeEnumValue);

  // path to property - an array of steps
  return state.setIn(
    ['boardSpaces', action.payload.row, action.payload.col], newSpace);
}

function animateMissile(state, action: AnimateMissileAction) {
    const locationCol = state.getIn(['missileLocation', 'col']); 
    const locationRow = state.getIn(['missileLocation', 'row'])
    const targetMissileLocationCol = calculateColumn(locationCol + 1);

    return state.withMutations((theState) => {
      theState
        .setIn(['boardSpaces', locationRow, locationCol], new BoardSpace(SpaceType.EMPTY))
        .setIn(['boardSpaces', locationRow, targetMissileLocationCol], new BoardSpace(SpaceType.MISSILE))
        .setIn(['missileLocation', 'col'], targetMissileLocationCol)
        .setIn(['missileLocation', 'row'], locationRow)
        .setIn(['missileLocation', 'active'], true);
    });
  }

  function destroyMissile(state, action: DestroyMissileAction) {
    const missileLocationRow = state.getIn(['missileLocation', 'row']);
    const missileLocationCol = state.getIn(['missileLocation', 'col']);

    return state.withMutations((theState) => {
      theState
        .setIn(['boardSpaces', missileLocationRow, missileLocationCol], new BoardSpace(SpaceType.EMPTY))
        .setIn(['missileLocation', 'col'], 0)
        .setIn(['missileLocation', 'row'], 0)
        .setIn(['missileLocation', 'active'], false);
    });
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
  const currentCol = state.getIn(['playerLocation', 'col']);
  const currentRow = state.getIn(['playerLocation', 'row']);
  const delta = action.payload.direction === MovementDirection.LEFT ? -1 : 1;
  const targetCol = calculateColumn(currentCol + delta);

  let newState = state.withMutations((theState) => {
    theState
      .setIn(['boardSpaces', currentRow, currentCol],  // wipe current space
      new BoardSpace(SpaceType.EMPTY))
      .setIn(['boardSpaces', currentRow, targetCol],   // render new space
      new BoardSpace(SpaceType.PLAYER))
      .setIn(['playerLocation', 'col'], targetCol);                             // track new X
  });
  return newState;
}

function moveRow(state, action) {
  const currentCol = state.getIn(['playerLocation', 'col']);
  const currentRow = state.getIn(['playerLocation', 'row']);
  const delta = action.payload.direction === MovementDirection.UP ? -1 : 1;
  const targetRow = calculateRow(currentRow + delta);

 let newState = state.withMutations((theState) => {
    theState
      .setIn(['boardSpaces', currentRow, currentCol],
         new BoardSpace(SpaceType.EMPTY))
      .setIn(['boardSpaces', targetRow, currentCol],
         new BoardSpace(SpaceType.PLAYER))
      .setIn(['playerLocation', 'row'], targetRow);                             // track new X
  });

  return newState;
}

function calculateColumn(targetCol): number {
  if (targetCol >= environment.cols) {
    return 0;
  } else if (targetCol  < 0) {
    return environment.cols - 1;
  } else {
    return targetCol;
  }
}

function calculateRow(targetRow): number {
  if (targetRow >= environment.rows ) {
    return 0;
  } else if (targetRow  < 0) {
    return environment.rows - 1;
  } else {
    return targetRow;
  }
}
