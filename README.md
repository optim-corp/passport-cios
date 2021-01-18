# passport-cios

[Passport](http://passportjs.org/) strategy for authenticating with [OPTiM Cloud IoT OS (CIOS)](https://www.optim.cloud/).

This module lets you authenticate using OPTiM Cloud IoT OS in your Node.js applications.
By plugging into Passport, OPTiM Cloud IoT OS authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```
npm install --save optim-corp/passport-cios
```

## Usage

Use Express

```js
const passport = require("passport")
const session = require("express-session")
const CIOSStrategy = require("passport-cios")

/**
 * Inisialize
 */ 
passport.use(new CIOSStrategy({

        // Required
        clientID: env.client_id,            // [required] CIOS OAuth Client ID
        clientSecret: env.client_secret,    // [required] CIOS OAuth Client Secret
        callbackURL: env.redirect_url,      // [required] App Redirect URL (ex: http://localhost:8080/oauth2/callback)
        scope: env.scope,                   // [required] CIOS Scopes

        // Option
        authorizationURL: "https://" + env.cios_auth_uri + "/connect/authorize",    // default: https://auth.optim.cloud/connect/authorize
        tokenURL: "https://" + env.cios_auth_uri + "/connect/token",                // default: https://auth.optim.cloud/connect/token
        profileURL: "https://" + env.cios_account_uri + "/v2/me",                   // default: https://accounts.optimcloudapis.com/v2/me
    },
    (accessToken, refreshToken, res, profile, cb) => {
        return cb(null, res)
    }
))
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize())
app.use(passport.session());


/**
 * Router
 */ 

// CIOS Login
app.get("/login/cios", passport.authenticate("cios"))

// Callback URL 
app.get("/oauth2/callback", passport.authenticate("cios", { failureRedirect: "/" }), (req, res) => {

    // Logic...

    // Example
    req.session.access_token = req.user.access_token    // AccessToken
    req.session.refresh_token = req.user.refresh_token  // Refresh Token

    return res.redirect("/")    // Redirect
},)

// Logout
app.get("/logout", (req, res)=>{

    // Logic...

    // Example
    req.session.access_token = null    // AccessToken
    req.session.refresh_token = null  // Refresh Token

    return res.redirect("/")    // Redirect
})


```

## How to Support

If you have any issues or questions, please raise them on [Github issues](https://github.com/optim-corp/passport-cios/issues).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 OPTiM Corporation <[https://www.optim.co.jp/](https://www.optim.co.jp/)>