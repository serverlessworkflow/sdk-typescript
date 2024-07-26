import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _UseAuthentications extends _Reflector<Specification.UseAuthentications> {
  constructor(data?: Partial<Specification.UseAuthentications>) {
    super(data);
  }
}

export const UseAuthentications = _UseAuthentications as {
  new (data?: Partial<Specification.UseAuthentications>): _UseAuthentications & Specification.UseAuthentications;
};
