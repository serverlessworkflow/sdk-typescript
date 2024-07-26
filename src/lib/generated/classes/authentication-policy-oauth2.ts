import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _AuthenticationPolicyOauth2 extends _Reflector<Specification.AuthenticationPolicyOauth2> {
  constructor(data?: Partial<Specification.AuthenticationPolicyOauth2>) {
    super(data);
  }
}

export const AuthenticationPolicyOauth2 = _AuthenticationPolicyOauth2 as {
  new (
    data?: Partial<Specification.AuthenticationPolicyOauth2>,
  ): _AuthenticationPolicyOauth2 & Specification.AuthenticationPolicyOauth2;
};
