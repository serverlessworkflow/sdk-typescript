import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ListenTask extends _Reflector<Specification.ListenTask> {
  constructor(data?: Partial<Specification.ListenTask>) {
    super(data);
  }
}

export const ListenTask = _ListenTask as {
  new (data?: Partial<Specification.ListenTask>): _ListenTask & Specification.ListenTask;
};
