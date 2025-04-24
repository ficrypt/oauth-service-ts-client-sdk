import { Jwt, ClientConfig } from '../src/model.js';

describe('Model', () => {
  describe('Interfaces', () => {
    it('should define the Jwt interface', () => {
      // This is a type check test, just verifying the interface exists
      const jwt: Jwt = { accessToken: 'test-token' };
      expect(jwt.accessToken).toBe('test-token');
    });

    it('should define the ClientConfig interface', () => {
      // This is a type check test, just verifying the interface exists
      const config: ClientConfig = { 
        clientId: 'test-client-id',
        baseUrl: 'https://example.com',
        oauthPageConfig: { theme: 'dark' }
      };
      
      expect(config.clientId).toBe('test-client-id');
      expect(config.baseUrl).toBe('https://example.com');
      expect(config.oauthPageConfig).toEqual({ theme: 'dark' });
    });
  });
});
