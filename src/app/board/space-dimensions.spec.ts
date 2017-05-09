export class Space {
  constructor(private type: string) {
  }
}

describe('2d geometry', () => {
  it('should work, dude', () => {
    expect(1).toBe(1);
  });
  it('should create a two dimensional array', () => {
    const board: Space[][] = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = new Space('X');
      }
    }
  });
});
