import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Extension extends _Reflector<Specification.Extension> {
  constructor(data?: Partial<Specification.Extension>) {
    super(data);
  }
}

export const Extension = _Extension as {
  new (data?: Partial<Specification.Extension>): _Extension & Specification.Extension;
};
