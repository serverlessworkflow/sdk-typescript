import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallGRPCWith extends _Reflector<Specification.CallGRPCWith> {
  constructor(data?: Partial<Specification.CallGRPCWith>) {
    super(data);
  }
}

export const CallGRPCWith = _CallGRPCWith as {
  new (data?: Partial<Specification.CallGRPCWith>): _CallGRPCWith & Specification.CallGRPCWith;
};
