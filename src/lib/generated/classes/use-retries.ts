import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _UseRetries extends _Reflector<Specification.UseRetries> {
  constructor(data?: Partial<Specification.UseRetries>) {
    super(data);
  }
}

export const UseRetries = _UseRetries as {
  new (data?: Partial<Specification.UseRetries>): _UseRetries & Specification.UseRetries;
};
