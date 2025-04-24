import {ExpireJwtRequest} from "@ficrypt/oauth";

interface Jwt extends ExpireJwtRequest{}

interface ClientConfig {
    clientId: string,
    baseUrl?: string,
    oauthPageConfig?: any,
}

export {
    Jwt,
    ClientConfig
}
