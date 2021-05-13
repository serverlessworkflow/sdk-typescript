import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function databasedswitchValidator(data: Specification.Databasedswitch): (() => Specification.Databasedswitch) {
  return () => {
    data.type = 'switch';
    const validate = validators.get('Databasedswitch');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Databasedswitch is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function databasedswitchBuilder(): Builder<Specification.Databasedswitch> {
  return builder<Specification.Databasedswitch>(databasedswitchValidator);
}