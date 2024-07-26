import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventConsumptionStrategyAny extends _Reflector<Specification.EventConsumptionStrategyAny> {
  constructor(data?: Partial<Specification.EventConsumptionStrategyAny>) {
    super(data);
  }
}

export const EventConsumptionStrategyAny = _EventConsumptionStrategyAny as {
  new (
    data?: Partial<Specification.EventConsumptionStrategyAny>,
  ): _EventConsumptionStrategyAny & Specification.EventConsumptionStrategyAny;
};
