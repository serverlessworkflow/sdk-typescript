import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Duration extends _Reflector<Specification.Duration> {
  constructor(data?: Partial<Specification.Duration>) {
    super(data);
  }
}

export const Duration = _Duration as {
  new (data?: Partial<Specification.Duration>): _Duration & Specification.Duration;
};
