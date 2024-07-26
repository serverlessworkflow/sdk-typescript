import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _UseErrors extends _Reflector<Specification.UseErrors> {
  constructor(data?: Partial<Specification.UseErrors>) {
    super(data);
  }
}

export const UseErrors = _UseErrors as {
  new (data?: Partial<Specification.UseErrors>): _UseErrors & Specification.UseErrors;
};
