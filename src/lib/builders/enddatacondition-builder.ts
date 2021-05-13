import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function enddataconditionValidator(data: Specification.Enddatacondition): (() => Specification.Enddatacondition) {
  return () => {
    const validate = validators.get('Enddatacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Enddatacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function enddataconditionBuilder(): Builder<Specification.Enddatacondition> {
  return builder<Specification.Enddatacondition>(enddataconditionValidator);
}