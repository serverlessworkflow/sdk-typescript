import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunShell extends _Reflector<Specification.RunTaskRunShell> {
  constructor(data?: Partial<Specification.RunTaskRunShell>) {
    super(data);
  }
}

export const RunTaskRunShell = _RunTaskRunShell as {
  new (data?: Partial<Specification.RunTaskRunShell>): _RunTaskRunShell & Specification.RunTaskRunShell;
};
