import { Client } from '../src/client';
import { Api } from '../src/api';
import { ExchangeJwtResponse } from '@ficrypt/oauth';

// Mock the Api class
jest.mock('../src/api', () => {
  const mockJwtApi = {
    exchange: jest.fn(),
    expire: jest.fn(),
    validateToken: jest.fn(),
  };

  return {
    Api: jest.fn().mockImplementation(() => ({
      GetJwtApi: () => mockJwtApi,
    })),
  };
});

describe('Client', () => {
  let client: Client;
  const mockClientId = 'test-client-id';
  
  beforeEach(() => {
    jest.clearAllMocks();
    client = new Client({ clientId: mockClientId });
  });

  describe('constructor', () => {
    it('should initialize with the provided config', () => {
      expect(Api).toHaveBeenCalledWith({ clientId: mockClientId });
    });
  });

  describe('exchangeAuthCode', () => {
    const mockAuthCode = 'test-auth-code';
    const mockResponse: ExchangeJwtResponse = {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      expiresIn: 3600,
    };

    it('should call the exchange method with the correct parameters', async () => {
      const mockExchange = (Api as jest.Mock).mock.results[0].value.GetJwtApi().exchange;
      mockExchange.mockResolvedValueOnce(mockResponse);

      const result = await client.exchangeAuthCode(mockAuthCode);

      expect(mockExchange).toHaveBeenCalledWith({
        exchangeJwtRequest: {
          authCode: mockAuthCode,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should reject with an error if the exchange fails', async () => {
      const mockError = new Error('Exchange failed');
      const mockExchange = (Api as jest.Mock).mock.results[0].value.GetJwtApi().exchange;
      mockExchange.mockRejectedValueOnce(mockError);

      await expect(client.exchangeAuthCode(mockAuthCode)).rejects.toEqual(mockError);
    });
  });

  describe('getSignInUrl', () => {
    it('should return the correct sign-in URL', () => {
      const url = client.getSignInUrl();
      expect(url).toContain('https://oauth.ui.ficrypt.com/sign-in');
      expect(url).toContain(`clientId=${mockClientId}`);
    });

    it('should include custom config parameters', () => {
      const customConfig = { redirectUri: 'https://example.com/callback' };
      const url = client.getSignInUrl(customConfig);
      expect(url).toContain('https://oauth.ui.ficrypt.com/sign-in');
      expect(url).toContain(`clientId=${mockClientId}`);
      expect(url).toContain(`redirectUri=${encodeURIComponent(customConfig.redirectUri)}`);
    });
  });

  describe('getSignUpUrl', () => {
    it('should return the correct sign-up URL', () => {
      const url = client.getSignUpUrl();
      expect(url).toContain('https://oauth.ui.ficrypt.com/sign-up');
      expect(url).toContain(`clientId=${mockClientId}`);
    });

    it('should include custom config parameters', () => {
      const customConfig = { redirectUri: 'https://example.com/callback' };
      const url = client.getSignUpUrl(customConfig);
      expect(url).toContain('https://oauth.ui.ficrypt.com/sign-up');
      expect(url).toContain(`clientId=${mockClientId}`);
      expect(url).toContain(`redirectUri=${encodeURIComponent(customConfig.redirectUri)}`);
    });
  });

  describe('signOut', () => {
    const mockCredential = { accessToken: 'test-access-token' };

    it('should call the expire method with the correct parameters', async () => {
      const mockExpire = (Api as jest.Mock).mock.results[0].value.GetJwtApi().expire;
      mockExpire.mockResolvedValueOnce({});

      await client.signOut(mockCredential);

      expect(mockExpire).toHaveBeenCalledWith({
        expireJwtRequest: mockCredential,
      });
    });

    it('should reject with an error if the expire fails', async () => {
      const mockError = new Error('Expire failed');
      const mockExpire = (Api as jest.Mock).mock.results[0].value.GetJwtApi().expire;
      mockExpire.mockRejectedValueOnce(mockError);

      await expect(client.signOut(mockCredential)).rejects.toEqual(mockError);
    });
  });

  describe('isValid', () => {
    const mockToken = 'test-token';

    it('should return true if the token is valid', async () => {
      const mockValidateToken = (Api as jest.Mock).mock.results[0].value.GetJwtApi().validateToken;
      mockValidateToken.mockResolvedValueOnce({});

      const result = await client.isValid(mockToken);

      expect(mockValidateToken).toHaveBeenCalledWith({
        validateJwtRequest: {
          token: mockToken,
        },
      });
      expect(result).toBe(true);
    });

    it('should return false if the token validation fails', async () => {
      const mockError = new Error('Validation failed');
      const mockValidateToken = (Api as jest.Mock).mock.results[0].value.GetJwtApi().validateToken;
      mockValidateToken.mockRejectedValueOnce(mockError);

      const result = await client.isValid(mockToken);

      expect(result).toBe(false);
    });
  });
});
