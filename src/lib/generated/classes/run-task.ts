import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTask extends _Reflector<Specification.RunTask> {
  constructor(data?: Partial<Specification.RunTask>) {
    super(data);
  }
}

export const RunTask = _RunTask as {
  new (data?: Partial<Specification.RunTask>): _RunTask & Specification.RunTask;
};
