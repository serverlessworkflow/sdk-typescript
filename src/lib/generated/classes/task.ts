import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Task extends _Reflector<Specification.Task> {
  constructor(data?: Partial<Specification.Task>) {
    super(data);
  }
}

export const Task = _Task as {
  new (data?: Partial<Specification.Task>): _Task & Specification.Task;
};
