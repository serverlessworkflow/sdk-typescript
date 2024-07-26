import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _SetTask extends _Reflector<Specification.SetTask> {
  constructor(data?: Partial<Specification.SetTask>) {
    super(data);
  }
}

export const SetTask = _SetTask as {
  new (data?: Partial<Specification.SetTask>): _SetTask & Specification.SetTask;
};
