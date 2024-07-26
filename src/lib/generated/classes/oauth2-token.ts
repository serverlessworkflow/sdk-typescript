import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Oauth2Token extends _Reflector<Specification.Oauth2Token> {
  constructor(data?: Partial<Specification.Oauth2Token>) {
    super(data);
  }
}

export const Oauth2Token = _Oauth2Token as {
  new (data?: Partial<Specification.Oauth2Token>): _Oauth2Token & Specification.Oauth2Token;
};
