import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunWorkflow extends _Reflector<Specification.RunTaskRunWorkflow> {
  constructor(data?: Partial<Specification.RunTaskRunWorkflow>) {
    super(data);
  }
}

export const RunTaskRunWorkflow = _RunTaskRunWorkflow as {
  new (data?: Partial<Specification.RunTaskRunWorkflow>): _RunTaskRunWorkflow & Specification.RunTaskRunWorkflow;
};
