import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RetryPolicyLimitAttempt extends _Reflector<Specification.RetryPolicyLimitAttempt> {
  constructor(data?: Partial<Specification.RetryPolicyLimitAttempt>) {
    super(data);
  }
}

export const RetryPolicyLimitAttempt = _RetryPolicyLimitAttempt as {
  new (
    data?: Partial<Specification.RetryPolicyLimitAttempt>,
  ): _RetryPolicyLimitAttempt & Specification.RetryPolicyLimitAttempt;
};
