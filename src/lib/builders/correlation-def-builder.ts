import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import CorrelationDef = ServerlessWorkflow.CorrelationDef;

export function correlationDefValidator(data: CorrelationDef): (() => CorrelationDef) {
  return () => {
    const validate = validators.get('CorrelationDef');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`CorrelationDef is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function correlationDefBuilder(): Builder<CorrelationDef> {
  return builder<CorrelationDef>(correlationDefValidator);
}