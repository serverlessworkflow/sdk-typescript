import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _AuthenticationPolicyBasic extends _Reflector<Specification.AuthenticationPolicyBasic> {
  constructor(data?: Partial<Specification.AuthenticationPolicyBasic>) {
    super(data);
  }
}

export const AuthenticationPolicyBasic = _AuthenticationPolicyBasic as {
  new (
    data?: Partial<Specification.AuthenticationPolicyBasic>,
  ): _AuthenticationPolicyBasic & Specification.AuthenticationPolicyBasic;
};
