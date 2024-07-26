import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _DocumentTags extends _Reflector<Specification.DocumentTags> {
  constructor(data?: Partial<Specification.DocumentTags>) {
    super(data);
  }
}

export const DocumentTags = _DocumentTags as {
  new (data?: Partial<Specification.DocumentTags>): _DocumentTags & Specification.DocumentTags;
};
