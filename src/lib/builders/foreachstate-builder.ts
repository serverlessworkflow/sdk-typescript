import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function foreachstateValidator(data: Specification.Foreachstate): (() => Specification.Foreachstate) {
  return () => {
    data.type = 'foreach';
    //FIXME https://github.com/serverlessworkflow/sdk-typescript/issues/95
    data.usedForCompensation = false;
    
    const validate = validators.get('Foreachstate');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Foreachstate is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function foreachstateBuilder(): Builder<Specification.Foreachstate> {
  return builder<Specification.Foreachstate>(foreachstateValidator);
}
