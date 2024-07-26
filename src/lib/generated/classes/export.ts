import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Export extends _Reflector<Specification.Export> {
  constructor(data?: Partial<Specification.Export>) {
    super(data);
  }
}

export const Export = _Export as {
  new (data?: Partial<Specification.Export>): _Export & Specification.Export;
};
