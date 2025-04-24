// Polyfill fetch for Node.js environment
import { fetch, Headers, Request, Response } from 'undici';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}
