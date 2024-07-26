import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ForkTask extends _Reflector<Specification.ForkTask> {
  constructor(data?: Partial<Specification.ForkTask>) {
    super(data);
  }
}

export const ForkTask = _ForkTask as {
  new (data?: Partial<Specification.ForkTask>): _ForkTask & Specification.ForkTask;
};
