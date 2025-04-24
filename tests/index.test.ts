import { Client } from '../src/client.js';
import * as index from '../src/index.js';

describe('Index', () => {
  it('should export the Client class', () => {
    expect(index.Client).toBe(Client);
  });
});
