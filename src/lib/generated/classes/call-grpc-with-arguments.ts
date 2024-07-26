import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallGRPCWithArguments extends _Reflector<Specification.CallGRPCWithArguments> {
  constructor(data?: Partial<Specification.CallGRPCWithArguments>) {
    super(data);
  }
}

export const CallGRPCWithArguments = _CallGRPCWithArguments as {
  new (
    data?: Partial<Specification.CallGRPCWithArguments>,
  ): _CallGRPCWithArguments & Specification.CallGRPCWithArguments;
};
