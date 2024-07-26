import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Workflow extends _Reflector<Specification.Workflow> {
  constructor(data?: Partial<Specification.Workflow>) {
    super(data);
  }
}

export const Workflow = _Workflow as {
  new (data?: Partial<Specification.Workflow>): _Workflow & Specification.Workflow;
};
