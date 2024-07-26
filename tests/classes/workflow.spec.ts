import { type } from 'ts-inference-check';
import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';

describe('Workflow class', () => {
  it('should be an instance of Workflow', () => {
    const workflow = new Classes.Workflow();
    expect(workflow).toBeInstanceOf(Classes.Workflow);
    expect(type(workflow.document).is<Specification.Document>(true)).toBe(true);
    expect(type(workflow.input).is<Specification.Input | undefined>(true)).toBe(true);
    expect(type(workflow.use).is<Specification.Use | undefined>(true)).toBe(true);
    expect(type(workflow.do).is<Specification.TaskList>(true)).toBe(true);
    expect(type(workflow.timeout).is<Specification.Timeout | undefined>(true)).toBe(true);
    expect(type(workflow.output).is<Specification.Output | undefined>(true)).toBe(true);
    expect(type(workflow.schedule).is<Specification.Schedule | undefined>(true)).toBe(true);
    expect(type(workflow.foobar).is<unknown>(true)).toBe(true);
  });
});
