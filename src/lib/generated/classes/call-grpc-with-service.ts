import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _CallGRPCWithService extends _Reflector<Specification.CallGRPCWithService> {
  constructor(data?: Partial<Specification.CallGRPCWithService>) {
    super(data);
  }
}

export const CallGRPCWithService = _CallGRPCWithService as {
  new (data?: Partial<Specification.CallGRPCWithService>): _CallGRPCWithService & Specification.CallGRPCWithService;
};
