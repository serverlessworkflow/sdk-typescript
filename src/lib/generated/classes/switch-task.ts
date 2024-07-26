import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _SwitchTask extends _Reflector<Specification.SwitchTask> {
  constructor(data?: Partial<Specification.SwitchTask>) {
    super(data);
  }
}

export const SwitchTask = _SwitchTask as {
  new (data?: Partial<Specification.SwitchTask>): _SwitchTask & Specification.SwitchTask;
};
