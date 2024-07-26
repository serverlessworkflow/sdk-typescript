import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallFunctionWith extends _Reflector<Specification.CallFunctionWith> {
  constructor(data?: Partial<Specification.CallFunctionWith>) {
    super(data);
  }
}

export const CallFunctionWith = _CallFunctionWith as {
  new (data?: Partial<Specification.CallFunctionWith>): _CallFunctionWith & Specification.CallFunctionWith;
};
