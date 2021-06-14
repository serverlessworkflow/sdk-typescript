import { validate } from '../../src/lib/utils';

describe('validate', () => {
  it('should throw an error containing the provided data', () => {
    expect(() => validate('End', 'any text')).toThrowError(/any text/);
  });

  it('should return true for valid objects', () => {
    expect(validate('End', false)).toBeTruthy('Expected function validate to return true for valid objects');
  });
});
