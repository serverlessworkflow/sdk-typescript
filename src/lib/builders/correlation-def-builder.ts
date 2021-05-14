import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.CorrelationDef} data The underlying object
 * @returns {Specification.CorrelationDef} The validated underlying object
 */
export function correlationDefValidator(data: Specification.CorrelationDef): (() => Specification.CorrelationDef) {
  return () => {
    const validate = validators.get('CorrelationDef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`CorrelationDef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.CorrelationDef`
 * @returns {Specification.CorrelationDef} A builder for `Specification.CorrelationDef`
 */
export function correlationDefBuilder(): Builder<Specification.CorrelationDef> {
  return builder<Specification.CorrelationDef>(correlationDefValidator);
}