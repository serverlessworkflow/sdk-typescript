import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _UseFunctions extends _Reflector<Specification.UseFunctions> {
  constructor(data?: Partial<Specification.UseFunctions>) {
    super(data);
  }
}

export const UseFunctions = _UseFunctions as {
  new (data?: Partial<Specification.UseFunctions>): _UseFunctions & Specification.UseFunctions;
};
