import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Schema extends _Reflector<Specification.Schema> {
  constructor(data?: Partial<Specification.Schema>) {
    super(data);
  }
}

export const Schema = _Schema as {
  new (data?: Partial<Specification.Schema>): _Schema & Specification.Schema;
};
