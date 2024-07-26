import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _TryTaskCatch extends _Reflector<Specification.TryTaskCatch> {
  constructor(data?: Partial<Specification.TryTaskCatch>) {
    super(data);
  }
}

export const TryTaskCatch = _TryTaskCatch as {
  new (data?: Partial<Specification.TryTaskCatch>): _TryTaskCatch & Specification.TryTaskCatch;
};
