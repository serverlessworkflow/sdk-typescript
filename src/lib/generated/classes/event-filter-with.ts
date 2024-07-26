import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventFilterWith extends _Reflector<Specification.EventFilterWith> {
  constructor(data?: Partial<Specification.EventFilterWith>) {
    super(data);
  }
}

export const EventFilterWith = _EventFilterWith as {
  new (data?: Partial<Specification.EventFilterWith>): _EventFilterWith & Specification.EventFilterWith;
};
