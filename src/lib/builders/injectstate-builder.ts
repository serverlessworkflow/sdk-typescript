import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function injectstateValidator(data: Specification.Injectstate): (() => Specification.Injectstate) {
  return () => {
    data.type = 'inject';
    const validate = validators.get('Injectstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Injectstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function injectstateBuilder(): Builder<Specification.Injectstate> {
  return builder<Specification.Injectstate>(injectstateValidator);
}