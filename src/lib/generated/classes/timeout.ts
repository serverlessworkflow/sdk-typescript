import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Timeout extends _Reflector<Specification.Timeout> {
  constructor(data?: Partial<Specification.Timeout>) {
    super(data);
  }
}

export const Timeout = _Timeout as {
  new (data?: Partial<Specification.Timeout>): _Timeout & Specification.Timeout;
};
