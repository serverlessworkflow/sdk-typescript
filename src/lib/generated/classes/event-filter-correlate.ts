import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventFilterCorrelate extends _Reflector<Specification.EventFilterCorrelate> {
  constructor(data?: Partial<Specification.EventFilterCorrelate>) {
    super(data);
  }
}

export const EventFilterCorrelate = _EventFilterCorrelate as {
  new (data?: Partial<Specification.EventFilterCorrelate>): _EventFilterCorrelate & Specification.EventFilterCorrelate;
};
