import {Api} from "./api.js";
import {ExchangeJwtResponse} from "@ficrypt/oauth";
import {ClientConfig, Jwt} from "./model.js";
import queryString from 'query-string'
import lodash from 'lodash';

const OAUTH_UI_URL = 'https://oauth.ui.ficrypt.com'

export class Client {
    private readonly config: ClientConfig;
    private api: Api

    constructor(config: ClientConfig) {
        this.config = config;
        this.api = new Api(this.config)
    }

    public async exchangeAuthCode(authCode: string): Promise<ExchangeJwtResponse> {
        try {
            return await this.api.GetJwtApi().exchange({
                exchangeJwtRequest: {
                    authCode: authCode,
                }
            });
        } catch (error) {
            // TODO define here specific error types like:
            // CodeAlreadyUsed
            // InvalidCode
            return Promise.reject(error)
        }
    }

    private getRedirectUrl(path: string): string {
        // build the schema+path
        let url = (this.config && this.config.baseUrl) ?? OAUTH_UI_URL
        url += path

        // build the query part
        const configCopy = lodash.merge({}, this.config.oauthPageConfig ?? {}, this.config ?? {})
        delete configCopy['baseUrl']

        // Parse key clientId to client-id
        configCopy['client-id'] = this.config.clientId
        delete configCopy['clientId']


        return queryString.stringifyUrl({url: url, query: {...configCopy}});
    }

    public getSignInUrl(): string  {
        return this.getRedirectUrl('/sign-in');
    }

    public getSignUpUrl(): string {
        return this.getRedirectUrl('/sign-up');
    }

    public async signOut(credential: Jwt) {
        try {
            // The ExpireJwtRequest expects a token property, so we need to pass the accessToken
            await this.api.GetJwtApi().expire({
                expireJwtRequest: { token: credential.accessToken }
            });
            
            // If we have a refreshToken, expire that too
            if (credential.refreshToken) {
                await this.api.GetJwtApi().expire({
                    expireJwtRequest: { token: credential.refreshToken }
                });
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async isValid(token: string): Promise<boolean> {
        try {
            await this.api.GetJwtApi().validateToken({validateJwtRequest: {
                token: token
            }})
            return true;
        } catch (error) {
            // TODO here check if error is 401 return false else return error.
            return false;
        }
    }

    // TODO add refresh token function

}
