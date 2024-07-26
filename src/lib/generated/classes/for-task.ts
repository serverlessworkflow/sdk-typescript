import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ForTask extends _Reflector<Specification.ForTask> {
  constructor(data?: Partial<Specification.ForTask>) {
    super(data);
  }
}

export const ForTask = _ForTask as {
  new (data?: Partial<Specification.ForTask>): _ForTask & Specification.ForTask;
};
