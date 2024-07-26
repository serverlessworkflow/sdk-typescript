import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallHTTP extends _Reflector<Specification.CallHTTP> {
  constructor(data?: Partial<Specification.CallHTTP>) {
    super(data);
  }
}

export const CallHTTP = _CallHTTP as {
  new (data?: Partial<Specification.CallHTTP>): _CallHTTP & Specification.CallHTTP;
};
