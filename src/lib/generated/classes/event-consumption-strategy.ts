import { _Reflector } from '../../reflector';
import { Specification } from '../definitions';

class _EventConsumptionStrategy extends _Reflector<Specification.EventConsumptionStrategy> {
  constructor(data?: Partial<Specification.EventConsumptionStrategy>) {
    super(data);
  }
}

export const EventConsumptionStrategy = _EventConsumptionStrategy as {
  new (
    data?: Partial<Specification.EventConsumptionStrategy>,
  ): _EventConsumptionStrategy & Specification.EventConsumptionStrategy;
};
