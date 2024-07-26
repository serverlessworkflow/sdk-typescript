import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _SetTaskSet extends _Reflector<Specification.SetTaskSet> {
  constructor(data?: Partial<Specification.SetTaskSet>) {
    super(data);
  }
}

export const SetTaskSet = _SetTaskSet as {
  new (data?: Partial<Specification.SetTaskSet>): _SetTaskSet & Specification.SetTaskSet;
};
