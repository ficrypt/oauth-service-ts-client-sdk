import { Client } from '../src/client.js';
import { jest } from '@jest/globals';

// These tests are marked as skipped because they would require actual API calls
// They serve as documentation for how integration tests could be structured
// To run these tests, you would need to provide actual credentials and remove the .skip

describe.skip('Integration Tests', () => {
  let client: Client;
  const clientId = 'your-client-id'; // Replace with actual client ID for testing
  const callback = 'https://tenant-site.com/oauth/callback'; // Replace with actual client ID for testing
  const baseurl = 'https://oauth-cutom-domain.com'; // Replace with actual client ID for testing

  beforeEach(() => {
    client = new Client({
      clientId,
      baseUrl: baseurl,
      callback: callback
    });
  });

  it('should generate a valid sign-in URL', () => {
    const url = client.getSignInUrl();
    expect(url).toContain(baseurl);
    expect(url).toContain(`client-id=${clientId}`);
    expect(url).toContain(`callback=${encodeURIComponent(callback)}`);
    expect(url).toContain(`/sign-in`);

    const urlWithConfig = client.getSignUpUrl();
    expect(urlWithConfig).toContain(baseurl);
    expect(urlWithConfig).toContain(`clientId=${clientId}`);
    expect(url).toContain(`callback=${encodeURIComponent(callback)}`);
    expect(url).toContain(`/sign-up`);
  });

  it('client without base url, fallback to default', () => {
    const clientDefault = new Client({
      clientId,
    })
    const signIn = client.getSignInUrl();
    expect(signIn).toContain("https://oauth.ui.ficrypt.com");

    const signUp = client.getSignUpUrl();
    expect(signUp).toContain("https://oauth.ui.ficrypt.com");

  })

  it('should exchange an auth code for JWT', async () => {
    // This test requires a valid auth code, which is typically obtained after user authentication
    const authCode = 'valid-auth-code'; // This would need to be a fresh, valid code
    
    try {
      const result = await client.exchangeAuthCode(authCode);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      // TODO expect(result.expiresIn).toBeGreaterThan(0);
    } catch (error) {
      // This will likely fail without a valid auth code
      console.error('Auth code exchange failed:', error);
      throw error;
    }
  });

  it('should validate a token', async () => {
    // This test requires a valid token
    const validToken = 'valid-access-token'; // Replace with an actual token
    
    const isValid = await client.isValid(validToken);
    expect(isValid).toBe(true);
  });

  it('should invalidate a token on sign out', async () => {
    // This test requires a valid token
    const validToken = 'valid-access-token'; // Replace with an actual token
    
    await client.signOut({ accessToken: validToken });
    
    // After signing out, the token should no longer be valid
    const isValid = await client.isValid(validToken);
    expect(isValid).toBe(false);
  });
});
