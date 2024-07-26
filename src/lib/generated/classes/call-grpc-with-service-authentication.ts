import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallGRPCWithServiceAuthentication extends _Reflector<Specification.CallGRPCWithServiceAuthentication> {
  constructor(data?: Partial<Specification.CallGRPCWithServiceAuthentication>) {
    super(data);
  }
}

export const CallGRPCWithServiceAuthentication = _CallGRPCWithServiceAuthentication as {
  new (
    data?: Partial<Specification.CallGRPCWithServiceAuthentication>,
  ): _CallGRPCWithServiceAuthentication & Specification.CallGRPCWithServiceAuthentication;
};
