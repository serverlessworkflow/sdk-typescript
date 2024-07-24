import { Classes } from '../../src/lib/generated/classes';

describe('workflow class', () => {
  it('should be an instance of Workflow', () => {
    const workflow = new Classes.Workflow();
    expect(workflow instanceof Classes.Workflow).toBe(true);
  });
});
