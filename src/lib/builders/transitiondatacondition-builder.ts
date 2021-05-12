import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function transitiondataconditionValidator(data: Specification.Transitiondatacondition): (() => Specification.Transitiondatacondition) {
  return () => {
    const validate = validators.get('Transitiondatacondition');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Transitiondatacondition is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function transitiondataconditionBuilder(): Builder<Specification.Transitiondatacondition> {
  return builder<Specification.Transitiondatacondition>(transitiondataconditionValidator);
}