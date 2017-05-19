import { playerReducer } from './player-reducer';
import { SetDirectionAction } from './player-actions';
import { MovementDirection } from '../models/movement-direction.enum';

describe('Player Reducer', () => {
  let state: any;

  beforeEach(() => {
    state = {
      x: 5,
      y: 5,
      xlimit: 10,
      ylimit: 10,
      vx: 0,
      vy: 0
    };
  });

  it('should set x velocity in the positive when moving right', () => {
     const reducedPlayer = playerReducer(state, new SetDirectionAction(MovementDirection.RIGHT));
     expect(reducedPlayer.vx).toBe(1);
  });
});
