import { DefinedError } from 'ajv';
import { Builder, builder } from '../builder';
import { Specification } from '../definitions';
import { validators } from '../validators';

export function metadataValidator(data: Specification.Metadata): (() => Specification.Metadata) {
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

export function metadataBuilder(): Builder<Specification.Metadata> {
  return builder<Specification.Metadata>(metadataValidator);
}