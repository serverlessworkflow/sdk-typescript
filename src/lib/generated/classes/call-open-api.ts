import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallOpenAPI extends _Reflector<Specification.CallOpenAPI> {
  constructor(data?: Partial<Specification.CallOpenAPI>) {
    super(data);
  }
}

export const CallOpenAPI = _CallOpenAPI as {
  new (data?: Partial<Specification.CallOpenAPI>): _CallOpenAPI & Specification.CallOpenAPI;
};
