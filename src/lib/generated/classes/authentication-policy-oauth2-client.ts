import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _AuthenticationPolicyOauth2Client extends _Reflector<Specification.AuthenticationPolicyOauth2Client> {
  constructor(data?: Partial<Specification.AuthenticationPolicyOauth2Client>) {
    super(data);
  }
}

export const AuthenticationPolicyOauth2Client = _AuthenticationPolicyOauth2Client as {
  new (
    data?: Partial<Specification.AuthenticationPolicyOauth2Client>,
  ): _AuthenticationPolicyOauth2Client & Specification.AuthenticationPolicyOauth2Client;
};
