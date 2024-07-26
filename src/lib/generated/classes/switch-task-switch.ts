import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _SwitchTaskSwitch extends _Reflector<Specification.SwitchTaskSwitch> {
  constructor(data?: Partial<Specification.SwitchTaskSwitch>) {
    super(data);
  }
}

export const SwitchTaskSwitch = _SwitchTaskSwitch as {
  new (data?: Partial<Specification.SwitchTaskSwitch>): _SwitchTaskSwitch & Specification.SwitchTaskSwitch;
};
