import { BoardSpace } from '../models/board-space';
import { List } from 'immutable';
import { SpaceType } from '../models/space-type.enum';
import { boardReducer } from './board-reducer'

describe('Board reducer spec', () => {
  it('should fill a two-dimensional array', () => {
    expect(boardReducer({}, undefined)).toBeDefined();
  });

  it('should fill a two-dimensional array with empty spaces', () => {
    const boardData = boardReducer({}, undefined);
    expect(boardData.board.toJS().length).toBe(10);
    expect(boardData.board.toJS()).toEqual(
      [
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY)),
        new Array(10).fill(new BoardSpace(SpaceType.EMPTY))
     ]);
  });
});