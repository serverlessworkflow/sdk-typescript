import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunShellArguments extends _Reflector<Specification.RunTaskRunShellArguments> {
  constructor(data?: Partial<Specification.RunTaskRunShellArguments>) {
    super(data);
  }
}

export const RunTaskRunShellArguments = _RunTaskRunShellArguments as {
  new (
    data?: Partial<Specification.RunTaskRunShellArguments>,
  ): _RunTaskRunShellArguments & Specification.RunTaskRunShellArguments;
};
