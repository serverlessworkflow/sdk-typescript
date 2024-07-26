import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ExternalResource extends _Reflector<Specification.ExternalResource> {
  constructor(data?: Partial<Specification.ExternalResource>) {
    super(data);
  }
}

export const ExternalResource = _ExternalResource as {
  new (data?: Partial<Specification.ExternalResource>): _ExternalResource & Specification.ExternalResource;
};
