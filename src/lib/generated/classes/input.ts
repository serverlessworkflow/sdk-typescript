import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Input extends _Reflector<Specification.Input> {
  constructor(data?: Partial<Specification.Input>) {
    super(data);
  }
}

export const Input = _Input as {
  new (data?: Partial<Specification.Input>): _Input & Specification.Input;
};
