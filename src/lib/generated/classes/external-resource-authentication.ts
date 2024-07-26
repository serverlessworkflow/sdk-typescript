import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ExternalResourceAuthentication extends _Reflector<Specification.ExternalResourceAuthentication> {
  constructor(data?: Partial<Specification.ExternalResourceAuthentication>) {
    super(data);
  }
}

export const ExternalResourceAuthentication = _ExternalResourceAuthentication as {
  new (
    data?: Partial<Specification.ExternalResourceAuthentication>,
  ): _ExternalResourceAuthentication & Specification.ExternalResourceAuthentication;
};
