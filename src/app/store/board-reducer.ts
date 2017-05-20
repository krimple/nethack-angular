import * as Immutable from 'immutable';

import { BoardActionTypes, SetTileAction } from './board-actions';

import { BoardActions } from './board-actions';
import { BoardSpace } from '../models/board-space';
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
const immutableStateStarter = Immutable.fromJS(boardSpaces);
 
export function boardReducer(state = immutableStateStarter, action: BoardActions): Immutable.List<BoardSpace[][]> {
  switch (action.type) {
    case BoardActionTypes.SET_TILE:
      return setTileIn(state, <SetTileAction>action);
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
    return state.setIn(
        [action.payload.row, action.payload.col],newSpace);
 }