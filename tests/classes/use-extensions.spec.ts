import { type } from 'ts-inference-check';
import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';

describe('UseExtensions class', () => {
  it('should be an instance of UseExtensions', () => {
    const useExtensions = new Classes.UseExtensions();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(0);
    expect(type(useExtensions.push).is<(...items: { [k: string]: Specification.Extension }[]) => number>(true)).toBe(
      true,
    );
  });
});
