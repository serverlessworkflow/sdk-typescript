import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Use extends _Reflector<Specification.Use> {
  constructor(data?: Partial<Specification.Use>) {
    super(data);
  }
}

export const Use = _Use as {
  new (data?: Partial<Specification.Use>): _Use & Specification.Use;
};
