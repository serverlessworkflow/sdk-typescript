import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RetryPolicyBackoff extends _Reflector<Specification.RetryPolicyBackoff> {
  constructor(data?: Partial<Specification.RetryPolicyBackoff>) {
    super(data);
  }
}

export const RetryPolicyBackoff = _RetryPolicyBackoff as {
  new (data?: Partial<Specification.RetryPolicyBackoff>): _RetryPolicyBackoff & Specification.RetryPolicyBackoff;
};
