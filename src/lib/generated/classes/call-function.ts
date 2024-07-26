import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallFunction extends _Reflector<Specification.CallFunction> {
  constructor(data?: Partial<Specification.CallFunction>) {
    super(data);
  }
}

export const CallFunction = _CallFunction as {
  new (data?: Partial<Specification.CallFunction>): _CallFunction & Specification.CallFunction;
};
