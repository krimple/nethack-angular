import { Board } from './board';
import { BoardSpace } from './board-space';
import { SpaceType } from './space-type.enum';

describe('Board spec', () => {
  const board: Board = new Board(3, 3);
  it('should fill a two-dimensional array', () => {
    expect(board).toBeDefined();
  });

  it('should fill a two-dimensional array with empty spaces', () => {
    expect(board.boardSpaces.length).toBe(3);
    expect(board.boardSpaces).toEqual([
      [
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY)
      ],
      [
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY)
      ],
      [
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY),
        new BoardSpace(SpaceType.EMPTY)
      ]
    ]);
  });
});