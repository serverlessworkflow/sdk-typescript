import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function dataconditionValidator(data: Specification.Datacondition): (() => Specification.Datacondition) {
  return () => {
    const validate = validators.get('Datacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Datacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function dataconditionBuilder(): Builder<Specification.Datacondition> {
  return builder<Specification.Datacondition>(dataconditionValidator);
}