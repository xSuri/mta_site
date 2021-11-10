// LIBLARY
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// APP REQUIRE

const app = require('../app')

// MYSQL

const db1 = require("../databases/db1");
const db2 = require("../databases/db2");

// -------

//  authentication secret

var authenticationSecret = speakeasy.generateSecret({
    name: 'AuthenticationAuthForMtaCodeBasic'
})

// admins auth secret

var authenticationAdministrationsSecret = speakeasy.generateSecret({
    name: 'Authentication Administrations'
})



// EXPORTS PAGE ROUTES 

exports.main = (req,res) => {
    res.render('home')
};

exports.check = (req,res) => {

    // functions to render sites

    function renderMtaMain(getTitle, getUserId){
        res.render('./site/mtaMain', { 
            title: getTitle,
            userId: getUserId
        })
    }

    function renderAuthenticator(getTitle, getType, getAuthenticator){
        res.render('./auths/authenticator', {
            title: getTitle,
            type: getType,
            authenticator: getAuthenticator
        })
    }
    
    db1.db1.query("SELECT * FROM `mta_web_users_accounts`", function (err, result) { // Get user acc info from WEB DB
        if (err) throw err;

        for (var x=0; x != result.length; x++){

            var authId = result[x]["authId"]

            var reqUserId = req.user.id

            if(authId == reqUserId ){ // If user match in DB

                x = result.length-1;

            }

            else if ( x == result.length-1 && authId != reqUserId){ // If user dont match in DB (create)

                var sql = "INSERT INTO `mta_web_users_accounts` (id , serial, authId, authed, date, authenticator_on, recovery_email) VALUES (NULL, N/A, ?, 0, NOW(), 0, ?)";
                db1.db1.query(sql, [req.user.id, req.user.emails[0].value], function (err, result) {
                    if (err) throw err;
                });

                qrcode.toDataURL(authenticationSecret.otpauth_url, function(err, data){
                    if(err) throw err;

                    var secretAscii = authenticationSecret.ascii

                    var generatedAuthenticationCode = data

                    var authenticationCode = "INSERT INTO mta_web_authenticator (id, qrcode, userId, date, secret_ascii) VALUES (NULL, ?, ?, NOW(), ?)";
                
                    db1.db1.query(authenticationCode, [generatedAuthenticationCode,req.user.id, secretAscii], function (err, result) {
                        if (err) throw err;
                    });
                })
            }
            // else{
            //     throw new Error("SyntaxError")
            // }

        }

        var found = "no";

        for ( var x=0; x != result.length; x++ ){ 

            var authId = result[x]["authId"]
            var authed = result[x]["authed"]
            var authOn = result[x]["authenticator_on"]
            var authRank = result[x]["authRank"]

            var reqUserId = req.user.id
            var reqSessionAuthenticator = req.session.authenticator

            
            if (authId == reqUserId && authed == "1"){ // If user account does exits and is authed

                found = "yes"

                
                if(authOn == "1"){ // If user have authenticator

                    if (reqSessionAuthenticator == 'authenticator_done'){ // If user authed

                        if(authRank == "Administrations"){    
                            
                            db1.db1.query("SELECT * FROM `mta_web_administrations`", function (err, result) { // Get user acc info from WEB DB
                                if (err) throw err;

                                for (var x=0; x != result.length; x++){

                                    var authId = result[x]["userId"]
                                    var dbUserQrCode = result[x]["qrcode"]
                                    var dbUserQrAscii = result[x]["secret_ascii"]

                                    var reqUserId = req.user.id
                                    var reqSessionAuthenticatorAdmins = req.session.authenticatorAdmins

                                    if(authId == reqUserId ){ // If user match in DB

                                        if(dbUserQrCode == "auth" && dbUserQrAscii == "auth"){

                                            qrcode.toDataURL(authenticationAdministrationsSecret.otpauth_url, function(err, data){
                                                if(err) throw err;
                            
                                                var secretAscii = authenticationAdministrationsSecret.ascii
                            
                                                var generatedAuthenticationCode = data
                            
                                                var authenticationCode = "UPDATE mta_web_administrations SET qrcode = ?, secret_ascii= ?  WHERE userId = ?";
                                            
                                                db1.db1.query(authenticationCode, [generatedAuthenticationCode, secretAscii, req.user.id], function (err, result) {
                                                    if (err) throw err;
                                                });

                                                
                                                res.render("./others/showQrCode", {
                                                    title: "Authenticator Admin QR",
                                                    type: "Admin QR Auth",
                                                    qr_code: generatedAuthenticationCode
                                                })

                                            })

                                        }
                                        else{

                                            if(reqSessionAuthenticatorAdmins == "authenticator_administrations_done"){

                                                renderMtaMain("Main", reqUserId)
                                            }
                                            else{
                                                renderAuthenticator("Authenticator Admins", "Auth Admins", "authenticateAdministrations")
                                            }

                                        }

                                    }

                                }

                            })

                        }
                        else{
                            renderMtaMain("Main", reqUserId)
                        }

                    }
                else{ // If user dont authed
                    renderAuthenticator("Authenticator", "Auth", "authenticator")
                }

                }
                else{ // If user dont have authenticator
                    renderMtaMain("Main", reqUserId)
                }
                

            }

        }
        if (found == "no"){ // If user dont authed
            res.render("./auths/generateCode")
        }
    })

};


exports.generateCode = (req,res) => {

    var reqUserId = req.user.id
    var flashAlert = req.flash('alert')
    var flashCode = req.flash('showCode')

    res.render('./auths/generateCode', {
        showCode: flashCode,
        alert: flashAlert,
        userId: reqUserId,
    })
};


exports.mtaMain = (req,res) => {

    // functions to render sites

    function renderMtaMain(getTitle, getUserId){
        res.render('./site/mtaMain', { 
            title: getTitle,
            userId: getUserId
        })
    }

    function renderAuthenticator(getTitle, getType, getAuthenticator){
        res.render('./auths/authenticator', {
            title: "Authenticator",
            type: "Auth",
            authenticator: "authenticator"
        })
    }

    db1.db1.query("SELECT * FROM `mta_web_users_accounts`", function (err, result) { // Get user acc info from WEB DB
        if(err) throw err;

        for (var x=0; x != result.length; x++ ){

            var authId = result[x]["authId"]
            var authed = result[x]["authed"]
            var authOn = result[x]["authenticator_on"]
            var authRank = result[x]["authRank"]

            var reqUserId = req.user.id
            var reqSessionAuthenticator = req.session.authenticator
            var reqSessionAuthenticatorAdmins = req.session.authenticatorAdmins

            if (authId == reqUserId && authed == "1"){ // If user account does exits and is authed

                if(authOn == "1"){ // If user have authenticator

                    if (reqSessionAuthenticator == 'authenticator_done'){ // If user authed

                        if(authRank == "Administrations"){

                            if(reqSessionAuthenticatorAdmins == "authenticator_administrations_done"){
                                renderMtaMain("Main", reqUserId)
                            }
                            else{
                                renderAuthenticator("Authenticator Admins", "Auth Admins", "authenticateAdministrations")
                            }
                        }
                    }
                }
                else{ // If user dont have authenticator
                    renderMtaMain("Main", reqUserId)
                }
               

            }

        }

    })


};

exports.profile = (req,res) => {

    // functions to render sites

    function renderProfile(getTitle, getUserId, getUserName, getHealth, getMoney, getBankMoney, getRep, getLicense, getSerial, getSkin, getQrCode, getRank){
        res.render('./site/profile', {

            title: getTitle,
            user_id: getUserId,

            rank: getRank,

            user_name: getUserName,
            health: getHealth,
            
            money: getMoney,
            bank_money: getBankMoney,
            reputation: getRep,
            license: getLicense,
            serial: getSerial,

            skin: getSkin,

            qr_code: getQrCode


        })
    }

    function renderAuthenticator(getTitle, getType, getAuthenticator){
        res.render('./auths/authenticator', {
            title: getTitle,
            type: getType,
            authenticator: getAuthenticator
        })
    }

    
    db1.db1.query("SELECT * FROM `mta_web_users_accounts`", function (err, result) { // Get user acc info from WEB DB

        for ( var x=0; x != result.length; x++ ){

            var authId = result[x]["authId"]
            var authed = result[x]["authed"]

            var reqUserId = req.user.id


            if ( authId == reqUserId && authed == "1"){ // If user account does exits and is authed
                
                // Get info from WEB DB
                webSerial = result[x]["serial"]
                webUserId = result[x]["authId"]

                db2.db2.query("SELECT * FROM `pystories_users`", function (err, result2) { // Get user acc info from MTA DB

                    for ( var y=0; y != result2.length; y++ ){

                        var resultDbMtaSerial = result2[y]["register_serial"]

                        if ( webSerial == resultDbMtaSerial){ // If web serial is same from mta db serial
                            
                            // get/set user info

                            userId = webUserId

                            userName = result2[y]["login"]
                            userHealth = result2[y]["zdrowie"]

                            userMoney = result2[y]["money"]
                            userBankMoney = result2[y]["bank_money"]
                            userRep = result2[y]["srp"]
                            

                            // Function to round values and suffix
                            function round(x) {
                                if(isNaN(x)) return x;
                            
                                else if(x < 9999) {
                                    return x + "$";
                                }
                            
                                if(x < 1000000) {
                                    return Math.round(x/1000) + "K";
                                }
                                if( x < 10000000) {
                                    return (x/1000000).toFixed(2) + "M";
                                }
                            
                                if(x < 1000000000) {
                                    return Math.round((x/1000000)) + "M";
                                }
                            
                                if(x < 1000000000000) {
                                    return Math.round((x/1000000000)) + "B";
                                }
                            }

                            // round values

                            userMoney = round(parseInt(userMoney))
                            userBankMoney = round(parseInt(userBankMoney))
                            userRep = round(parseInt(userRep))

                            // get license

                            var pjA = result2[y]["pjA"]
                            var pjB = result2[y]["pjB"]
                            var pjC = result2[y]["pjC"]
                            var pjL = result2[y]["pjL"]

                            // license cat.

                            if ( pjA == 1){
                                pjA = "A"
                            }

                            if ( pjB == 1){
                                pjB = "B"
                            }

                            if ( pjC == 1){
                                pjC = "C"
                            }

                            if ( pjL == 1){
                                pjL = "L"
                            }


                            userLicense = pjA + ", " + pjB + ", " + pjC + ", " + pjL
                            userSerial = result2[y]["register_serial"]

                            userSkin = result2[y]["skin"]

                            //---------------------QR CODE--------------------------

                            db1.db1.query("SELECT * FROM `mta_web_users_accounts`", function (err, result){
                                if(err) throw err;

                                for ( var x=0; x != result.length; x++ ){

                                    var authId = result[x]["authId"]
                                    var authOn = result[x]["authenticator_on"]
                                    var authRank = result[x]["authRank"]
                        
                                    var reqUserId = req.user.id

                                    if ( authId == reqUserId ){
                                        db1.db1.query("SELECT * FROM `mta_web_authenticator` WHERE userId=?", [authId], function (err, result){
                                            if(err) throw err;

                                            for ( var x=0; x != result.length; x++ ){
                                                            
                                                var userId = result[x]["userId"]
                                                var qrCode = result[x]["qrcode"]
                                    
                                                var reqSessionAuthenticator = req.session.authenticator
                                                var reqSessionAuthenticatorAdmins = req.session.authenticatorAdmins

                                                if ( userId == authId ){
                                                    
                                                    result.length-1;

                                                    if(authOn == "1"){ // If user have authenticator

                                                        db1.db1.query("SELECT * FROM `mta_web_administrations` WHERE userId=?", [userId], function (err, result){
                                                            if (err) throw err;

                                                            var rank = result[0]["rank"]

                                                            if (reqSessionAuthenticator == 'authenticator_done'){ // If user authed

                                                                if(authRank == "Administrations"){
                                        
                                                                    if(reqSessionAuthenticatorAdmins == "authenticator_administrations_done"){

                                                                        // if(rank == "Owner"){

                                                                        if(rank != "Owner"){
                                                                            rank = "User"
                                                                        }

                                                                        renderProfile("User Profile", userId, userName, userHealth, "~ " + userMoney, "~ " + userBankMoney, "~ " + userRep, userLicense, userSerial, userSkin, qrCode, rank)
                                                                        
                                                                    }
                                                                    else{
                                                                        renderAuthenticator("Authenticator Admins", "Auth Admins", "authenticateAdministrations")
                                                                    }
                                        
                                                                }
                                                                else{
                                                                    renderProfile("User Profile", userId, userName, userHealth, "~ " + userMoney, "~ " + userBankMoney, "~ " + userRep, userLicense, userSerial, userSkin, qrCode)
                                                                }
                                                                
                                                                
                                                            }
                                                            else{ // If user dont authed
                                                                renderAuthenticator("Authenticator", "Auth", "authenticator")
                                                            }

                                                        })

                                                    }

                                                    else{  // If user dont have authenticator 
                                                        renderProfile("User Profile", userId, userName, userHealth, "~ " + userMoney, "~ " + userBankMoney, "~ " + userRep, userLicense, userSerial, userSkin, qrCode)
                                                    }

                                                    
                                                }
            
                                            }
            
                                        })

                                    }

                                }

                            })

                        }

                    }

                })

            }

        }

    })



};

// exports.adminConsoleSite = (req,res) => {

//     function renderAdminConsoleSite(getTitle){
//         res.render('./admin/adminConsole', {
//             title: getTitle
//         })
//     }


//     function renderAuthenticator(getTitle, getType, getAuthenticator){
//         res.render('./auths/authenticator', {
//             title: getTitle,
//             type: getType,
//             authenticator: getAuthenticator
//         })
//     }

//     db1.db1.query("SELECT * FROM `mta_web_users_accounts`", function (err, result){
//         if(err) throw err;

//         for ( var x=0; x != result.length; x++ ){

//             var authId = result[x]["authId"]
//             var userId = result[x]["userId"]
//             var authOn = result[x]["authenticator_on"]
//             var authRank = result[x]["authRank"]

//             var reqUserId = req.user.id

//             if ( authId == reqUserId ){

//                 db1.db1.query("SELECT * FROM `mta_web_authenticator`", function (err, result){
//                     if(err) throw err;

//                     for ( var x=0; x != result.length; x++ ){

//                         if ( userId == authId ){

                            
//                             if(authOn == "1"){ // If user have authenticator

//                                 if (reqSessionAuthenticator == 'authenticator_done'){ // If user authed

//                                     if(authRank == "Administrations"){
            
//                                         if(reqSessionAuthenticatorAdmins == "authenticator_administrations_done"){
//                                             renderAdminConsoleSite("Admin Console")
//                                         }
//                                         else{
//                                             renderAuthenticator("Authenticator Admins", "Auth Admins", "authenticateAdministrations")
//                                         }
            
//                                     }
//                                     else{
//                                         renderAdminConsoleSite("Admin Console")
//                                     }
                                    
                                    
//                                 }
//                                 else{ // If user dont authed
//                                     renderAuthenticator("Authenticator", "Auth", "authenticator")
//                                 }
//                             }
//                             else{  // If user dont have authenticator 
//                                 renderAdminConsoleSite("Admin Console")
//                             }

//                         }

//                     }

//                 })
//             }        
//         }
//     })   
// }
