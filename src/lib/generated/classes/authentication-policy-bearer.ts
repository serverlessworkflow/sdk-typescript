import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _AuthenticationPolicyBearer extends _Reflector<Specification.AuthenticationPolicyBearer> {
  constructor(data?: Partial<Specification.AuthenticationPolicyBearer>) {
    super(data);
  }
}

export const AuthenticationPolicyBearer = _AuthenticationPolicyBearer as {
  new (
    data?: Partial<Specification.AuthenticationPolicyBearer>,
  ): _AuthenticationPolicyBearer & Specification.AuthenticationPolicyBearer;
};
