import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _FlowDirective extends _Reflector<Specification.FlowDirective> {
  constructor(data?: Partial<Specification.FlowDirective>) {
    super(data);
  }
}

export const FlowDirective = _FlowDirective as {
  new (data?: Partial<Specification.FlowDirective>): _FlowDirective & Specification.FlowDirective;
};
