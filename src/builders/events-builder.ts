import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Events = ServerlessWorkflow.Events;

export function eventsValidator(data: Events): (() => Events) {
  return () => {
    const validate = validators.get('Events');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Events is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function eventsBuilder(): Builder<Events> {
  return builder<Events>(eventsValidator);
}