import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RetryPolicy extends _Reflector<Specification.RetryPolicy> {
  constructor(data?: Partial<Specification.RetryPolicy>) {
    super(data);
  }
}

export const RetryPolicy = _RetryPolicy as {
  new (data?: Partial<Specification.RetryPolicy>): _RetryPolicy & Specification.RetryPolicy;
};
