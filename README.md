# oauth-service-ts-client-sdk

Install
```shell
npm install @ficrypt/oauth-service-ts-client-sdk
```

Usage:
```ts
// Initialization
import { Client } from '@ficrypt/oauth-service-ts-client-sdk';

const ficryptOauthClient = new Client({
    clientId: 'from-oauth-ficrypt-admin'
});
```

Redirect the user to Ficrypt Oauth starting the process
```ts
window.location.href = ficryptOauthClient.getSignInUrl();

// OR

window.location.href = ficryptOauthClient.getSignInUrl();
```
Note the url can be rendered inside of links too:
```html
// React for example
<a href={ficrypt.getSignInUrl()} />Sign In</a>
```

After sign in callback with success:
```ts
// After the redirection back from the oauth service
// you will have ?code=<code> query paramter that you can exange for JWT.
const credentials = ficryptOauthClient.exchangeAuthCode(code)

// Save the credentals in a secure place
```

Sign out:

```ts
const token = localStorage.getItem('access-token'); // depends on the storage used

if(token) {
    ficryptOauthClient.signOut({
        accessToken: token
    })    
}
```

Verify if the accessToken or the refreshToken is expired:
```ts
const token = localStorage.getItem('access-token'); // depends on the storage used

if(token) {
    const isValid = ficryptOauthClient.isValid(token);
    // use isValid in the logic
}
```


How to get the ClientId?
[https://todo.link.to.documentaiton.com](https://todo.link.to.documentaiton.com)