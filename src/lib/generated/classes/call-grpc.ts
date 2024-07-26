import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallGRPC extends _Reflector<Specification.CallGRPC> {
  constructor(data?: Partial<Specification.CallGRPC>) {
    super(data);
  }
}

export const CallGRPC = _CallGRPC as {
  new (data?: Partial<Specification.CallGRPC>): _CallGRPC & Specification.CallGRPC;
};
