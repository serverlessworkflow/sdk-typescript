import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _DoTask extends _Reflector<Specification.DoTask> {
  constructor(data?: Partial<Specification.DoTask>) {
    super(data);
  }
}

export const DoTask = _DoTask as {
  new (data?: Partial<Specification.DoTask>): _DoTask & Specification.DoTask;
};
