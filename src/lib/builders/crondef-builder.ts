import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function crondefValidator(data: Specification.Crondef): (() => Specification.Crondef) {
  return () => {
    const validate = validators.get('Crondef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Crondef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function crondefBuilder(): Builder<Specification.Crondef> {
  return builder<Specification.Crondef>(crondefValidator);
}