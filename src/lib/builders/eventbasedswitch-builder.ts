import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Eventbasedswitch = ServerlessWorkflow.Eventbasedswitch;

export function eventbasedswitchValidator(data: Eventbasedswitch): (() => Eventbasedswitch) {
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

export function eventbasedswitchBuilder(): Builder<Eventbasedswitch> {
  return builder<Eventbasedswitch>(eventbasedswitchValidator);
}