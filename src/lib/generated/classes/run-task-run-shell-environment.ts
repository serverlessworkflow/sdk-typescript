import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunShellEnvironment extends _Reflector<Specification.RunTaskRunShellEnvironment> {
  constructor(data?: Partial<Specification.RunTaskRunShellEnvironment>) {
    super(data);
  }
}

export const RunTaskRunShellEnvironment = _RunTaskRunShellEnvironment as {
  new (
    data?: Partial<Specification.RunTaskRunShellEnvironment>,
  ): _RunTaskRunShellEnvironment & Specification.RunTaskRunShellEnvironment;
};
