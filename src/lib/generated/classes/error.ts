import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Error extends _Reflector<Specification.Error> {
  constructor(data?: Partial<Specification.Error>) {
    super(data);
  }
}

export const Error = _Error as {
  new (data?: Partial<Specification.Error>): _Error & Specification.Error;
};
