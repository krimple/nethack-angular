import { SpaceType } from './space-type.enum';
export class BoardSpace {
  constructor(public spaceType: SpaceType) {
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
      case SpaceType.MISSILE:
        return '*';
      default:
        return '?';
    }
  }
}
