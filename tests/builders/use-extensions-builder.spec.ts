import { useExtensionsBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

describe('UseExtensions builder', () => {
  it('should build with fluent api', () => {
    const extension = {
      myExtension: {
        extend: 'call' as const,
      },
    };
    const useExtensions = useExtensionsBuilder().push(extension).build();
    expect(useExtensions).toBeDefined();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(1);
    expect(useExtensions[0].myExtension).toEqual(extension.myExtension);
  });

  it('should build with input', () => {
    const extension = {
      myExtension: {
        extend: 'call' as const,
      },
    };
    const useExtensions = useExtensionsBuilder([extension]).build();
    expect(useExtensions).toBeDefined();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(1);
    expect(useExtensions[0].myExtension).toEqual(extension.myExtension);
  });

  it('should throw with non-array', () => {
    const test = () => {
      useExtensionsBuilder({ foo: 'bar' } as any).build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow('The provided model should be an array');
  });

  it('should validate', () => {
    const test = () => {
      useExtensionsBuilder([1, 2, 3] as any).build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'UseExtensions' is invalid/);
  });

  it('should not validate', () => {
    const test = () => {
      useExtensionsBuilder([1, 2, 3] as any).build(false);
    };
    expect(test).not.toThrow();
  });
});
