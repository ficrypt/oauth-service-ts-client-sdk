import {
    BaseAPI,
    Configuration,
    JwtApi,
    Middleware,
} from "@ficrypt/oauth";
import {ClientConfig} from "./model.js";

const basePath: string = 'https://oauth-api.ficrypt.com';

const makeApiInstance = (config: ClientConfig, ApiClass: typeof BaseAPI, _headers?: object, middleware?: Middleware[]): any => {
    const configuration = new Configuration({
        basePath: config.backendApiBasePath ?? basePath,
        headers: {
            ...{
                'Client-Id': config.clientId
            },
        },
        middleware: middleware ?? [],
    });
    return new ApiClass(configuration);
};

class Api {
    private readonly jwtApi: JwtApi;

    constructor(config: ClientConfig) {
        this.jwtApi = makeApiInstance(config, JwtApi)
    }

    public GetJwtApi() {
        return this.jwtApi
    }
}

export {
    Api,
}