import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _UseExtensions extends _Reflector<Specification.UseExtensions> {
  constructor(data?: Partial<Specification.UseExtensions>) {
    super(data);
  }
}

export const UseExtensions = _UseExtensions as {
  new (data?: Partial<Specification.UseExtensions>): _UseExtensions & Specification.UseExtensions;
};
