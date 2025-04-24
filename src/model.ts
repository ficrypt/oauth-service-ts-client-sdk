import {ExchangeJwtResponse} from "@ficrypt/oauth";

interface Jwt extends ExchangeJwtResponse{}

interface ClientConfig {
    clientId: string,
    baseUrl?: string,
    oauthPageConfig?: any,
}

export type {
    Jwt,
    ClientConfig
}
