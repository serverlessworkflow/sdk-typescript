import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _AuthenticationPolicy extends _Reflector<Specification.AuthenticationPolicy> {
  constructor(data?: Partial<Specification.AuthenticationPolicy>) {
    super(data);
  }
}

export const AuthenticationPolicy = _AuthenticationPolicy as {
  new (data?: Partial<Specification.AuthenticationPolicy>): _AuthenticationPolicy & Specification.AuthenticationPolicy;
};
