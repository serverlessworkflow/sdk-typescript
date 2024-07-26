import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ForkTaskFork extends _Reflector<Specification.ForkTaskFork> {
  constructor(data?: Partial<Specification.ForkTaskFork>) {
    super(data);
  }
}

export const ForkTaskFork = _ForkTaskFork as {
  new (data?: Partial<Specification.ForkTaskFork>): _ForkTaskFork & Specification.ForkTaskFork;
};
