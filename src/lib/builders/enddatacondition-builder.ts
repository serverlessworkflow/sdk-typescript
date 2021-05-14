import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Enddatacondition} data The underlying object
 * @returns {Specification.Enddatacondition} The validated underlying object
 */
export function enddataconditionValidator(data: Specification.Enddatacondition): () => Specification.Enddatacondition {
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

/**
 * A factory to create a builder proxy for the type `Specification.Enddatacondition`
 * @returns {Specification.Enddatacondition} A builder for `Specification.Enddatacondition`
 */
export function enddataconditionBuilder(): Builder<Specification.Enddatacondition> {
  return builder<Specification.Enddatacondition>(enddataconditionValidator);
}
