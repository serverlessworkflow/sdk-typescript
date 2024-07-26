import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EmitTask extends _Reflector<Specification.EmitTask> {
  constructor(data?: Partial<Specification.EmitTask>) {
    super(data);
  }
}

export const EmitTask = _EmitTask as {
  new (data?: Partial<Specification.EmitTask>): _EmitTask & Specification.EmitTask;
};
