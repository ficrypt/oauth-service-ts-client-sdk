import { Client } from '../src/client';
import * as index from '../src/index';

describe('Index', () => {
  it('should export the Client class', () => {
    expect(index.Client).toBe(Client);
  });
});
