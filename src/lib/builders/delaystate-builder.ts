import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function delaystateValidator(data: Specification.Delaystate): (() => Specification.Delaystate) {
  return () => {
    data.type = 'delay';
    const validate = validators.get('Delaystate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Delaystate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function delaystateBuilder(): Builder<Specification.Delaystate> {
  return builder<Specification.Delaystate>(delaystateValidator);
}