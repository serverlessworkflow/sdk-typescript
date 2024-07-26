import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _TaskBase extends _Reflector<Specification.TaskBase> {
  constructor(data?: Partial<Specification.TaskBase>) {
    super(data);
  }
}

export const TaskBase = _TaskBase as {
  new (data?: Partial<Specification.TaskBase>): _TaskBase & Specification.TaskBase;
};
