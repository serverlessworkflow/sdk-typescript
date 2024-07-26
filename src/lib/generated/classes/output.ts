import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Output extends _Reflector<Specification.Output> {
  constructor(data?: Partial<Specification.Output>) {
    super(data);
  }
}

export const Output = _Output as {
  new (data?: Partial<Specification.Output>): _Output & Specification.Output;
};
