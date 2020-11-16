var host = "http://localhost:3000/oauth/facebook" // Write your callback URL here

// Write your client ID
var getClientId = "WRITEID"
// Write your secrets
var getClientSecret = "WRITESECRET"

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: getClientId, 
    clientSecret: getClientSecret, 
    callbackURL: host
},
  function(accessToken, refreshToken, profile, done) {
    if (profile) {
        user = profile;
        return done(null, user);
        }
        else {
        return done(null, false);
        }
  }
));