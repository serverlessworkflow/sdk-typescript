import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function eventstateValidator(data: Specification.Eventstate): (() => Specification.Eventstate) {
  return () => {
    data.type = 'event';
    const validate = validators.get('Eventstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventstateBuilder(): Builder<Specification.Eventstate> {
  return builder<Specification.Eventstate>(eventstateValidator);
}