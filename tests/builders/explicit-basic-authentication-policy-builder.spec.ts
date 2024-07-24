import { explicitBasicAuthenticationPolicyBuilder } from '../../src/lib/generated/builders/explicit-basic-authentication-policy-builder';
import { Classes } from '../../src/lib/generated/classes';

describe('ExplicitBasicAuthenticationPolicy builder', () => {
  it('should build', () => {
    const username = 'foo';
    const password = 'bar';
    const explicitBasicAuthenticationPolicy = explicitBasicAuthenticationPolicyBuilder()
      .username(username)
      .password(password)
      .build();
    expect(explicitBasicAuthenticationPolicy).toBeDefined();
    expect(explicitBasicAuthenticationPolicy.username).toBe(username);
    expect(explicitBasicAuthenticationPolicy.password).toBe(password);
    expect(explicitBasicAuthenticationPolicy instanceof Classes.ExplicitBasicAuthenticationPolicy).toBe(true);
  });
});
