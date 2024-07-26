import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallAsyncAPIWith extends _Reflector<Specification.CallAsyncAPIWith> {
  constructor(data?: Partial<Specification.CallAsyncAPIWith>) {
    super(data);
  }
}

export const CallAsyncAPIWith = _CallAsyncAPIWith as {
  new (data?: Partial<Specification.CallAsyncAPIWith>): _CallAsyncAPIWith & Specification.CallAsyncAPIWith;
};
