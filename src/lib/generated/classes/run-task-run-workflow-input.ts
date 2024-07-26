import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunWorkflowInput extends _Reflector<Specification.RunTaskRunWorkflowInput> {
  constructor(data?: Partial<Specification.RunTaskRunWorkflowInput>) {
    super(data);
  }
}

export const RunTaskRunWorkflowInput = _RunTaskRunWorkflowInput as {
  new (
    data?: Partial<Specification.RunTaskRunWorkflowInput>,
  ): _RunTaskRunWorkflowInput & Specification.RunTaskRunWorkflowInput;
};
