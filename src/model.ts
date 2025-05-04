import {ExchangeJwtResponse} from "@ficrypt/oauth";

interface Jwt extends ExchangeJwtResponse{}

interface ClientConfig {
    clientId: string,
    baseUrl?: string,
    callback?: string,
    oauthPageConfig?: any,
}

export type {
    Jwt,
    ClientConfig
}
