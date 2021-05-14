import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Subflowstate} data The underlying object
 * @returns {Specification.Subflowstate} The validated underlying object
 */
export function subflowstateValidator(data: Specification.Subflowstate): () => Specification.Subflowstate {
  return () => {
    const validate = validators.get('Subflowstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Subflowstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Subflowstate`
 * @returns {Specification.Subflowstate} A builder for `Specification.Subflowstate`
 */
export function subflowstateBuilder(): Builder<Specification.Subflowstate> {
  return builder<Specification.Subflowstate>(subflowstateValidator);
}
