import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _ListenTaskListen extends _Reflector<Specification.ListenTaskListen> {
  constructor(data?: Partial<Specification.ListenTaskListen>) {
    super(data);
  }
}

export const ListenTaskListen = _ListenTaskListen as {
  new (data?: Partial<Specification.ListenTaskListen>): _ListenTaskListen & Specification.ListenTaskListen;
};
