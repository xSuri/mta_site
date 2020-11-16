var host = "http://localhost:3000/oauth/redirect" // Write your callback URL here

// Write your client ID
var getClientId = "WRITEID"
// Write your secret
var getClientSecret = "WRITESECRET"

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
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