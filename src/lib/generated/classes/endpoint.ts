import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Endpoint extends _Reflector<Specification.Endpoint> {
  constructor(data?: Partial<Specification.Endpoint>) {
    super(data);
  }
}

export const Endpoint = _Endpoint as {
  new (data?: Partial<Specification.Endpoint>): _Endpoint & Specification.Endpoint;
};
