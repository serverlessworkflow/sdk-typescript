import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Schedule extends _Reflector<Specification.Schedule> {
  constructor(data?: Partial<Specification.Schedule>) {
    super(data);
  }
}

export const Schedule = _Schedule as {
  new (data?: Partial<Specification.Schedule>): _Schedule & Specification.Schedule;
};
