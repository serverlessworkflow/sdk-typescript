import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function parallelstateValidator(data: Specification.Parallelstate): (() => Specification.Parallelstate) {
  return () => {
    data.type = 'parallel';
    const validate = validators.get('Parallelstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Parallelstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function parallelstateBuilder(): Builder<Specification.Parallelstate> {
  return builder<Specification.Parallelstate>(parallelstateValidator);
}