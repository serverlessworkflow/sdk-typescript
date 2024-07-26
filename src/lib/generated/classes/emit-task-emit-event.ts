import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EmitTaskEmitEvent extends _Reflector<Specification.EmitTaskEmitEvent> {
  constructor(data?: Partial<Specification.EmitTaskEmitEvent>) {
    super(data);
  }
}

export const EmitTaskEmitEvent = _EmitTaskEmitEvent as {
  new (data?: Partial<Specification.EmitTaskEmitEvent>): _EmitTaskEmitEvent & Specification.EmitTaskEmitEvent;
};
