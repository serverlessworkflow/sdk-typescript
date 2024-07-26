import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _TaskList extends _Reflector<Specification.TaskList> {
  constructor(data?: Partial<Specification.TaskList>) {
    super(data);
  }
}

export const TaskList = _TaskList as {
  new (data?: Partial<Specification.TaskList>): _TaskList & Specification.TaskList;
};
