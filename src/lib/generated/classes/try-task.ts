import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _TryTask extends _Reflector<Specification.TryTask> {
  constructor(data?: Partial<Specification.TryTask>) {
    super(data);
  }
}

export const TryTask = _TryTask as {
  new (data?: Partial<Specification.TryTask>): _TryTask & Specification.TryTask;
};
