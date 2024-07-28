import { callHTTPBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

describe('CallHTTP builder', () => {
  it('should build with fluent api', () => {
    const endpoint = 'https://serverlessworkflow.io';
    const method = 'get';
    const callHttp = callHTTPBuilder()
      .call('http') // should be set by the CallHTTP class
      .with({
        endpoint,
        method,
      })
      .build();
    expect(callHttp).toBeDefined();
    expect(callHttp).toBeInstanceOf(Classes.CallHTTP);
    expect(callHttp.call).toBe('http');
    expect(callHttp.with).toBeDefined();
    expect(callHttp.with!.endpoint).toBe(endpoint);
    expect(callHttp.with!.method).toBe(method);
  });

  it('should build with input', () => {
    const endpoint = 'https://serverlessworkflow.io';
    const method = 'get';
    const data = {
      call: 'http' as const,
      with: {
        endpoint,
        method,
      },
    };
    const callHttp = callHTTPBuilder(data).build();
    expect(callHttp).toBeDefined();
    expect(callHttp).toBeInstanceOf(Classes.CallHTTP);
    expect(callHttp.call).toBe('http');
    expect(callHttp.with).toBeDefined();
    expect(callHttp.with!.endpoint).toBe(endpoint);
    expect(callHttp.with!.method).toBe(method);
  });

  it('should validate', () => {
    const test = () => {
      callHTTPBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'CallHTTP' is invalid/);
    expect(test).toThrow(/must have required property 'call'/);
  });

  it('should not validate', () => {
    const test = () => {
      callHTTPBuilder().build(false);
    };
    expect(test).not.toThrow();
  });
});
