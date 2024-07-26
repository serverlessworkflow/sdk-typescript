import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _Document extends _Reflector<Specification.Document> {
  constructor(data?: Partial<Specification.Document>) {
    super(data);
  }
}

export const Document = _Document as {
  new (data?: Partial<Specification.Document>): _Document & Specification.Document;
};
