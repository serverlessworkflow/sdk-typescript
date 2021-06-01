import { ErrorObject } from 'ajv';

export class ValidationError {
  readonly message: string;

  constructor(readonly error: ErrorObject) {
    this.message = `invalid: ${error.instancePath} | ${error.schemaPath} | ${error.message}`;
  }
}
