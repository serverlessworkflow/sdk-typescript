import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallTask extends _Reflector<Specification.CallTask> {
  constructor(data?: Partial<Specification.CallTask>) {
    super(data);
  }
}

export const CallTask = _CallTask as {
  new (data?: Partial<Specification.CallTask>): _CallTask & Specification.CallTask;
};
