import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RaiseTaskRaise extends _Reflector<Specification.RaiseTaskRaise> {
  constructor(data?: Partial<Specification.RaiseTaskRaise>) {
    super(data);
  }
}

export const RaiseTaskRaise = _RaiseTaskRaise as {
  new (data?: Partial<Specification.RaiseTaskRaise>): _RaiseTaskRaise & Specification.RaiseTaskRaise;
};
