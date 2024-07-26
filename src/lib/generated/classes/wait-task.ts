import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _WaitTask extends _Reflector<Specification.WaitTask> {
  constructor(data?: Partial<Specification.WaitTask>) {
    super(data);
  }
}

export const WaitTask = _WaitTask as {
  new (data?: Partial<Specification.WaitTask>): _WaitTask & Specification.WaitTask;
};
