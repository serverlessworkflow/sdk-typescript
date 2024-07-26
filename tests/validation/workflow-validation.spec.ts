import { Classes } from '../../src/lib/generated/classes';
import { validate } from '../../src/lib/validation';

describe('Workflow validation', () => {
  it('should be invalid', () => {
    const workflow = new Classes.Workflow();
    const test = () => validate('Workflow', workflow);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'Workflow' is invalid/);
  });
});
