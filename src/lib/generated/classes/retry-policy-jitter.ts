import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RetryPolicyJitter extends _Reflector<Specification.RetryPolicyJitter> {
  constructor(data?: Partial<Specification.RetryPolicyJitter>) {
    super(data);
  }
}

export const RetryPolicyJitter = _RetryPolicyJitter as {
  new (data?: Partial<Specification.RetryPolicyJitter>): _RetryPolicyJitter & Specification.RetryPolicyJitter;
};
