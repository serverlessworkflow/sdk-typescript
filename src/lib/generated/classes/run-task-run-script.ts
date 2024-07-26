import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunScript extends _Reflector<Specification.RunTaskRunScript> {
  constructor(data?: Partial<Specification.RunTaskRunScript>) {
    super(data);
  }
}

export const RunTaskRunScript = _RunTaskRunScript as {
  new (data?: Partial<Specification.RunTaskRunScript>): _RunTaskRunScript & Specification.RunTaskRunScript;
};
