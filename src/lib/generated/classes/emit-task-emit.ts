import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EmitTaskEmit extends _Reflector<Specification.EmitTaskEmit> {
  constructor(data?: Partial<Specification.EmitTaskEmit>) {
    super(data);
  }
}

export const EmitTaskEmit = _EmitTaskEmit as {
  new (data?: Partial<Specification.EmitTaskEmit>): _EmitTaskEmit & Specification.EmitTaskEmit;
};
