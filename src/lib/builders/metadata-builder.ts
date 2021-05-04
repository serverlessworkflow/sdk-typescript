import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { validators } from '../validators';
import Metadata = ServerlessWorkflow.Metadata;

export function metadataValidator(data: Metadata): (() => Metadata) {
  return () => {
    const validate = validators.get('Metadata');
    // TODO: ignore validation if no validator or throw ?
    if (!validate) return data;
    if (!validate(data)) {
      console.warn(validate.errors);
      const firstError: DefinedError = (validate.errors as DefinedError[])[0];
      throw new Error(`Metadata is invalid: ${firstError.message}`);
    }
    return data;
  };
}

export function metadataBuilder(): Builder<Metadata> {
  return builder<Metadata>(metadataValidator);
}