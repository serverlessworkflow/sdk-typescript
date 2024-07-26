import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallAsyncAPIWithAuthentication extends _Reflector<Specification.CallAsyncAPIWithAuthentication> {
  constructor(data?: Partial<Specification.CallAsyncAPIWithAuthentication>) {
    super(data);
  }
}

export const CallAsyncAPIWithAuthentication = _CallAsyncAPIWithAuthentication as {
  new (
    data?: Partial<Specification.CallAsyncAPIWithAuthentication>,
  ): _CallAsyncAPIWithAuthentication & Specification.CallAsyncAPIWithAuthentication;
};
