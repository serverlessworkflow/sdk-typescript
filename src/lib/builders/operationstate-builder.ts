import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function operationstateValidator(data: Specification.Operationstate): (() => Specification.Operationstate) {
  return () => {
    data.type = 'operation';
    const validate = validators.get('Operationstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Operationstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function operationstateBuilder(): Builder<Specification.Operationstate> {
  return builder<Specification.Operationstate>(operationstateValidator);
}