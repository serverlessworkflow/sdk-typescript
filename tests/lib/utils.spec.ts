import { validate } from '../../src/lib/utils';

describe('validate', () => {
  it('should throw an error containing the provided data', () => {
    expect(() => validate('End', 'any text')).toThrowError(/any text/);
  });

  it('should return true for valid objects', () => {
    expect(validate('End', false)).toBeTruthy('Expected function validate to return true for valid objects');
  });

  it('should ignore "normalize" function as additionalProperty', () => {
    const functionObj = {
      name: 'function',
      operation: 'operation',
      type: 'rest',
      normalize: () => {
        //do something
      },
    };

    expect(validate('Function', functionObj)).toBeTruthy();
  });
  
  it('should NOT ignore additionalProperties', () => {
    const functionObj = {
      name: 'function',
      operation: 'operation',
      type: 'rest',
      keyAdditionalProperty: 'anyValue',
    };
    
    expect(() => validate('Function', functionObj)).toThrowError(/keyAdditionalProperty/);
  });

});
