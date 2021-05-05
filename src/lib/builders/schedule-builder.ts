import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Schedule = ServerlessWorkflow.Schedule;

export function scheduleValidator(data: Schedule): (() => Schedule) {
  return () => {
    const validate = validators.get('Schedule');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Schedule is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function scheduleBuilder(): Builder<Schedule> {
  return builder<Schedule>(scheduleValidator);
}