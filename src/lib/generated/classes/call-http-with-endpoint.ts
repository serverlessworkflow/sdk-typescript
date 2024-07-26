import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallHTTPWithEndpoint extends _Reflector<Specification.CallHTTPWithEndpoint> {
  constructor(data?: Partial<Specification.CallHTTPWithEndpoint>) {
    super(data);
  }
}

export const CallHTTPWithEndpoint = _CallHTTPWithEndpoint as {
  new (data?: Partial<Specification.CallHTTPWithEndpoint>): _CallHTTPWithEndpoint & Specification.CallHTTPWithEndpoint;
};
