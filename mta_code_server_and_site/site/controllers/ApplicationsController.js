// LIBLARY

const uuid = require('uuid');
const speakeasy = require('speakeasy');

// MYSQL


// LINK FILES DB (CONFIG)

const db1 = require("../databases/db1");
const db2 = require("../databases/db2");

// CONNECT TO DB's
db1.db1.connect(function(err) {
    if (err) throw err;
    console.log("Connected!\n");
});

db2.db2.connect(function(err) {
    if (err) throw err;
    console.log("Connected!\n");
});

// EXPORTS APP ROUTES 
exports.newCode = (req,res) => {
    
    var generatedCode = uuid.v4(); // Generate code

    var serialNick = "";
    
    db2.db2.query("SELECT * FROM `pystories_users`", function (err, result2) { // Get info user from MTA DB 
        if (err) throw err;

        var found = "no";

        db1.db1.query("SELECT * FROM `mta_web_code`", function (err, result) { // Get info web from WEB DB
            if(err) throw err;
            
            for ( var x=0; x != result.length; x++ ){

                userCodeSerial = result[x]["serial"]

                userSiteSerial = req.body.serial

                if( userCodeSerial == userSiteSerial ){

                    found = "record found"

                    var del = "DELETE FROM `mta_web_code` WHERE serial = "+"'"+`${req.body.serial}`+"'"; // Delete code if serial is found
                    db1.db1.query(del, function (err, result) {
                        if (err) throw err;
                    });
                }
            }

            if ( found == "record found"){ // If code one more generated
            
                req.flash('showCode', "");
                req.flash('alert', "Last code is deleted. Generate new code now.");
                res.redirect('/generateCode');
    
            }

            else{
    
                for ( var x=0; x != result2.length; x++ ){

                    userSerial = result2[x]["register_serial"]

                    userSiteSerial = req.body.serial
    
                    if( userSerial ==  userSiteSerial){ // If serial match
    
                        x=result2.length-1;
                        serialNick = result2[x]["login"];
                        found = "yes";
    
                        var sql4 = "INSERT INTO mta_web_code (id ,serial, code, nick, date) VALUES (NULL, "+"'"+req.body.serial+"'"+","+"'"+generatedCode+"'"+","+"'"+serialNick+"'"+","+" Now() )"; // Generate code in WEB DB
                        
                        db1.db1.query(sql4, function (err, result) {
                            if (err) throw err;
    
                            var resultText = generatedCode;
                            var alert = "Generated code."
                            
                            req.flash('showCode', resultText);
                            req.flash('alert', alert);
                            res.redirect('/generateCode');
                            
    
                        });
    
                    }
                    else{
                        found = "no";
                    }
    
                }
                if (found == "no"){ // If serial dont found
                    req.flash('showCode', "");
                    req.flash('alert', "Dont found this user serial.");
                    res.redirect('/generateCode');
                }
            }
            
        })

    })
};


exports.authenticate = (req,res) => {

    var authCode = req.body.authCode

    db1.db1.query("SELECT * FROM `mta_web_authenticator`", function (err, result) {
        if(err) throw err;

        var reqUserId = req.user.id
        var userId = result[x]["userId"]

        console.log(userId)

        var reqSessionAuthenticator = req.session.authenticator

        if (err) throw err;
        for ( var x=0; x != result.length; x++ ){

            if(userId == reqUserId ){

                var secretAscii = result[x]["secret_ascii"]

                var auth = speakeasy.totp.verify({
                    secret: secretAscii,
                    encoding: 'ascii',
                    token: authCode
                })
            
                if ( auth == true ){
                    reqSessionAuthenticator = 'authenticator_done'
                    res.redirect('/check')
                }
                else{
                    req.flash('alert', 'Code is incorrect')
                    res.redirect('/check')
                }

                x = result.length-1;
        
            }

        }
        

    })
    
}

exports.authenticateAdministrations = (req,res) => {

    var authCode = req.body.authCode

    db1.db1.query("SELECT * FROM `mta_web_administrations`", function (err, result) {
        if(err) throw err;

            var reqUserId = req.user.id
            var userId = result[x]["userId"]

            var reqSessionAuthenticatorAdmins = req.session.authenticatorAdmins

            if (err) throw err;

                for ( var x=0; x != result.length; x++ ){

                    if(userId == reqUserId ){

                        var secretAscii = result[x]["secret_ascii"]

                        var auth = speakeasy.totp.verify({
                            secret: secretAscii,
                            encoding: 'ascii',
                            token: authCode
                        })

                        if ( auth == true ){
                            reqSessionAuthenticatorAdmins = 'authenticator_administrations_done'
                            res.redirect('/check')
                        }
                        else{
                            req.flash('alert', 'Code is incorrect')
                            res.redirect('/check')
                        }

                        
                        x = result.length-1;

                    }

            }


        })
    
}

// exports.adminConsole = (req,res) => {

//     console.log(req.body)

//     const ranks = ["Owner"]

//     var body = req.body
//     var bodyGiveRole = body.give_admin_role
//     var bodyData = body.data

//     var reqUserId = req.user.id
//     var reqSessionAuthenticatorAdmins = req.session.authenticatorAdmins

//     db1.db1.query("SELECT * FROM `mta_web_administrations`", function (err, result) {
//         if (err) throw err;

//             for ( var x=0; x != result.length; x++ ){

//                 console.log(result[x]);

//                 var userId = result[x]["userId"]
//                 console.log(userId)

//                 if(userId == reqUserId ){

//                     console.log("tes")

//                     if(reqSessionAuthenticatorAdmins == "authenticator_administrations_done"){

//                         db1.db1.query("SELECT * FROM `mta_web_administrations`", function (err, result) {
//                             if(err) throw err;

//                             var userAdminId = result[x]["userId"]

//                             for ( var x=0; x != result.length; x++ ){

//                                 if(userId == userAdminId){

//                                     var rank = result[x]["rank"]

//                                     if (rank == ranks[0]){

//                                         if (bodyGiveRole != "" && bodyData != "" ){

//                                             console.log("cos")
                                            
//                                         }

//                                     }

//                                     x = result.length-1;
//                                 }

//                             }

//                         })

//                     }
//                     else{
//                         res.redirect("/check")
//                     }
                    
//                     x = result.length-1;
//                 }

//         }


//     })


// }