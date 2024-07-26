import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RetryPolicyLimit extends _Reflector<Specification.RetryPolicyLimit> {
  constructor(data?: Partial<Specification.RetryPolicyLimit>) {
    super(data);
  }
}

export const RetryPolicyLimit = _RetryPolicyLimit as {
  new (data?: Partial<Specification.RetryPolicyLimit>): _RetryPolicyLimit & Specification.RetryPolicyLimit;
};
