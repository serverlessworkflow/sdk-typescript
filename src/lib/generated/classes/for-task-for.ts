import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ForTaskFor extends _Reflector<Specification.ForTaskFor> {
  constructor(data?: Partial<Specification.ForTaskFor>) {
    super(data);
  }
}

export const ForTaskFor = _ForTaskFor as {
  new (data?: Partial<Specification.ForTaskFor>): _ForTaskFor & Specification.ForTaskFor;
};
