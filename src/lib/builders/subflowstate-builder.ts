import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Subflowstate = ServerlessWorkflow.Subflowstate;

export function subflowstateValidator(data: Subflowstate): (() => Subflowstate) {
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

export function subflowstateBuilder(): Builder<Subflowstate> {
  return builder<Subflowstate>(subflowstateValidator);
}