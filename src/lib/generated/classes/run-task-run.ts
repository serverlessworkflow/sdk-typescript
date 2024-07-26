import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRun extends _Reflector<Specification.RunTaskRun> {
  constructor(data?: Partial<Specification.RunTaskRun>) {
    super(data);
  }
}

export const RunTaskRun = _RunTaskRun as {
  new (data?: Partial<Specification.RunTaskRun>): _RunTaskRun & Specification.RunTaskRun;
};
