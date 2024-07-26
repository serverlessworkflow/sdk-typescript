import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallOpenAPIWithAuthentication extends _Reflector<Specification.CallOpenAPIWithAuthentication> {
  constructor(data?: Partial<Specification.CallOpenAPIWithAuthentication>) {
    super(data);
  }
}

export const CallOpenAPIWithAuthentication = _CallOpenAPIWithAuthentication as {
  new (
    data?: Partial<Specification.CallOpenAPIWithAuthentication>,
  ): _CallOpenAPIWithAuthentication & Specification.CallOpenAPIWithAuthentication;
};
