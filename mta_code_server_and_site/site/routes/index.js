// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

// LIBLARY

const express = require('express');
const router = express.Router();

const passport = require('passport');

// LINK FILES PAGE/APP CONTROLLERS etc.

const PagesController = require("../controllers/PagesController");
const ApplicationsController = require("../controllers/ApplicationsController");

// ROUTES

router.get("/", PagesController.main);

router.get("/check", isLoggedIn, PagesController.check);
router.get("/generateCode", isLoggedIn, PagesController.generateCode);
router.get("/mtaMain", isLoggedIn, PagesController.mtaMain);

router.get("/profile", isLoggedIn, PagesController.profile);

// router.get("/adminConsoleSite", isLoggedIn, PagesController.adminConsoleSite);

//----

router.post("/newCode", ApplicationsController.newCode);
router.post("/authenticator", ApplicationsController.authenticate);
router.post("/authenticateAdministrations", ApplicationsController.authenticateAdministrations);

// router.post("/adminConsole", ApplicationsController.adminConsole);


// --------------------------------------- AUTHS ---------------------------------------

// * GOOGLE

require('../passports/passport-google');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/check');
    }
);


// * GITHUB

require("../passports/passport-github")

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/oauth/redirect', passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/check');
});

// * YOUTUBEv3

require("../passports/passport-youtube3")

router.get('/youtube', passport.authenticate('youtube', { scope: ["https://www.googleapis.com/auth/youtube.readonly"] }));

router.get('/oauth/youtube', passport.authenticate('youtube', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/check');
});

// * FACEBOOK

require('../passports/passport-facebook')

router.get('/oauth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

router.get('/oauth/facebook', passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/check');
});

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// PAGE TO LOGOUT SESSION

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) throw err;
    })
    
    req.session = null;
    req.logout();
    res.redirect('/');
})

// EXPORT ROUTER (ROUTES)

module.exports = router;