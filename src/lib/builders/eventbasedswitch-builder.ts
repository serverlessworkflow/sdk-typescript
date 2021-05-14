import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.Eventbasedswitch} data The underlying object
 * @returns {Specification.Eventbasedswitch} The validated underlying object
 */
export function eventbasedswitchValidator(data: Specification.Eventbasedswitch): () => Specification.Eventbasedswitch {
  return () => {
    data.type = 'switch';
    const validate = validators.get('Eventbasedswitch');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Eventbasedswitch is invalid: ${firstError.message}`);
    }
    return data;
  };
}

/**
 * A factory to create a builder proxy for the type `Specification.Eventbasedswitch`
 * @returns {Specification.Eventbasedswitch} A builder for `Specification.Eventbasedswitch`
 */
export function eventbasedswitchBuilder(): Builder<Specification.Eventbasedswitch> {
  return builder<Specification.Eventbasedswitch>(eventbasedswitchValidator);
}
