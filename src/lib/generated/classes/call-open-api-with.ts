import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallOpenAPIWith extends _Reflector<Specification.CallOpenAPIWith> {
  constructor(data?: Partial<Specification.CallOpenAPIWith>) {
    super(data);
  }
}

export const CallOpenAPIWith = _CallOpenAPIWith as {
  new (data?: Partial<Specification.CallOpenAPIWith>): _CallOpenAPIWith & Specification.CallOpenAPIWith;
};
