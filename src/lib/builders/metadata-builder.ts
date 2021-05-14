import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Metadata} data The underlying object
 * @returns {Specification.Metadata} The validated underlying object
 */
export function metadataValidator(data: Specification.Metadata): (() => Specification.Metadata) {
  return () => {
    const validate = validators.get('Metadata');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Metadata is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Metadata`
 * @returns {Specification.Metadata} A builder for `Specification.Metadata`
 */
export function metadataBuilder(): Builder<Specification.Metadata> {
  return builder<Specification.Metadata>(metadataValidator);
}