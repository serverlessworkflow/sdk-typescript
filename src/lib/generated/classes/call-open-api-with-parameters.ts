import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallOpenAPIWithParameters extends _Reflector<Specification.CallOpenAPIWithParameters> {
  constructor(data?: Partial<Specification.CallOpenAPIWithParameters>) {
    super(data);
  }
}

export const CallOpenAPIWithParameters = _CallOpenAPIWithParameters as {
  new (
    data?: Partial<Specification.CallOpenAPIWithParameters>,
  ): _CallOpenAPIWithParameters & Specification.CallOpenAPIWithParameters;
};
