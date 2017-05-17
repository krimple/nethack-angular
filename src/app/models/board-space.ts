import { SpaceType } from './space-type.enum';
export class BoardSpace {
  constructor(public row: number, public col: number, public spaceType: SpaceType) {
  }

  indexOf(): number {
    return this.row * 32768 + this.col;
  }
  generateView(): string {
    switch (this.spaceType) {
      case SpaceType.EMPTY:
        return 'gi-empty-chessboard';
      case SpaceType.ARROW:
        return 'gi-missile-pod';
      case SpaceType.MONSTER:
        return 'gi-monkey';
      case SpaceType.PLAYER:
        return 'gi-donkey';
      default:
        return '?';
    }
  }
}
