import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Parallelstate = ServerlessWorkflow.Parallelstate;

export function parallelstateValidator(data: Parallelstate): (() => Parallelstate) {
  return () => {
    data.type = 'parallel';
    const validate = validators.get('Parallelstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Parallelstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function parallelstateBuilder(): Builder<Parallelstate> {
  return builder<Parallelstate>(parallelstateValidator);
}