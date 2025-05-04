import {ExchangeJwtResponse} from "@ficrypt/oauth";

interface Jwt extends ExchangeJwtResponse{}

interface ClientConfig {
    clientId: string,
    baseUrl?: string,
    callback?: string,
    backendApiBasePath?: string, // Mainly used for development
    oauthPageConfig?: any,
}

export type {
    Jwt,
    ClientConfig
}
