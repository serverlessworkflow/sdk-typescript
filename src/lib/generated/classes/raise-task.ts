import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RaiseTask extends _Reflector<Specification.RaiseTask> {
  constructor(data?: Partial<Specification.RaiseTask>) {
    super(data);
  }
}

export const RaiseTask = _RaiseTask as {
  new (data?: Partial<Specification.RaiseTask>): _RaiseTask & Specification.RaiseTask;
};
