import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallHTTPWith extends _Reflector<Specification.CallHTTPWith> {
  constructor(data?: Partial<Specification.CallHTTPWith>) {
    super(data);
  }
}

export const CallHTTPWith = _CallHTTPWith as {
  new (data?: Partial<Specification.CallHTTPWith>): _CallHTTPWith & Specification.CallHTTPWith;
};
