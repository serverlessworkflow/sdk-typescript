import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function subflowstateValidator(data: Specification.Subflowstate): (() => Specification.Subflowstate) {
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

export function subflowstateBuilder(): Builder<Specification.Subflowstate> {
  return builder<Specification.Subflowstate>(subflowstateValidator);
}