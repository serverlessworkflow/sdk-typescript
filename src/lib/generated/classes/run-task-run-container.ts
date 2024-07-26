import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _RunTaskRunContainer extends _Reflector<Specification.RunTaskRunContainer> {
  constructor(data?: Partial<Specification.RunTaskRunContainer>) {
    super(data);
  }
}

export const RunTaskRunContainer = _RunTaskRunContainer as {
  new (data?: Partial<Specification.RunTaskRunContainer>): _RunTaskRunContainer & Specification.RunTaskRunContainer;
};
