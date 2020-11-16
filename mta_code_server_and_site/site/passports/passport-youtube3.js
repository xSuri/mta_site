var host = "http://localhost:3000/oauth/youtube" // Write your callback URL here

// Write your client ID
var getClientId = "WRITEID"
// Write your secret
var getClientSecret = "WRITESECRET"

const passport = require('passport');
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
 
passport.use(new YoutubeV3Strategy({
    clientID: getClientId,
    clientSecret: getClientSecret, 
    callbackURL: host,
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