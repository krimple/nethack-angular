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
        return '.';
      case SpaceType.ARROW:
        return '*';
      case SpaceType.MONSTER:
        return 'M';
      case SpaceType.PLAYER:
        return '$';
      default:
        return '?';
    }
  }
}
