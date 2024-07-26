import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EndpointAuthentication extends _Reflector<Specification.EndpointAuthentication> {
  constructor(data?: Partial<Specification.EndpointAuthentication>) {
    super(data);
  }
}

export const EndpointAuthentication = _EndpointAuthentication as {
  new (
    data?: Partial<Specification.EndpointAuthentication>,
  ): _EndpointAuthentication & Specification.EndpointAuthentication;
};
