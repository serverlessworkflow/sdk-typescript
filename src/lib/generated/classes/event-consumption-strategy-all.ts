import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventConsumptionStrategyAll extends _Reflector<Specification.EventConsumptionStrategyAll> {
  constructor(data?: Partial<Specification.EventConsumptionStrategyAll>) {
    super(data);
  }
}

export const EventConsumptionStrategyAll = _EventConsumptionStrategyAll as {
  new (
    data?: Partial<Specification.EventConsumptionStrategyAll>,
  ): _EventConsumptionStrategyAll & Specification.EventConsumptionStrategyAll;
};
