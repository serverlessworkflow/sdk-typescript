import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallAsyncAPI extends _Reflector<Specification.CallAsyncAPI> {
  constructor(data?: Partial<Specification.CallAsyncAPI>) {
    super(data);
  }
}

export const CallAsyncAPI = _CallAsyncAPI as {
  new (data?: Partial<Specification.CallAsyncAPI>): _CallAsyncAPI & Specification.CallAsyncAPI;
};
