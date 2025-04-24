import { Api } from '../src/api';
import { Configuration, JwtApi } from '@ficrypt/oauth';

// Mock the @ficrypt/oauth module
jest.mock('@ficrypt/oauth', () => {
  return {
    Configuration: jest.fn(),
    JwtApi: jest.fn().mockImplementation(() => ({
      // Mock methods as needed
    })),
  };
});

describe('Api', () => {
  const mockClientId = 'test-client-id';
  const mockConfig = { clientId: mockClientId };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default basePath when not provided', () => {
      new Api(mockConfig);
      
      expect(Configuration).toHaveBeenCalledWith({
        basePath: 'https://oauth-api.ficrypt.com',
        headers: {
          'Client-Id': mockClientId,
        },
        middleware: [],
      });
      
      expect(JwtApi).toHaveBeenCalled();
    });

    it('should initialize with custom basePath when provided', () => {
      const customBasePath = 'https://custom-api.example.com';
      new Api({ ...mockConfig, baseUrl: customBasePath });
      
      expect(Configuration).toHaveBeenCalledWith({
        basePath: customBasePath,
        headers: {
          'Client-Id': mockClientId,
        },
        middleware: [],
      });
    });
  });

  describe('GetJwtApi', () => {
    it('should return the JwtApi instance', () => {
      const api = new Api(mockConfig);
      const jwtApi = api.GetJwtApi();
      
      expect(jwtApi).toBeDefined();
    });
  });
});
