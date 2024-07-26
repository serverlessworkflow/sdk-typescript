import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventFilter extends _Reflector<Specification.EventFilter> {
  constructor(data?: Partial<Specification.EventFilter>) {
    super(data);
  }
}

export const EventFilter = _EventFilter as {
  new (data?: Partial<Specification.EventFilter>): _EventFilter & Specification.EventFilter;
};
