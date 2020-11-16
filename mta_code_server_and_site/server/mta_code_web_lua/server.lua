-- DATABASE MYSQL CODE

-- To Web DB
DBHandler=nil
DBName="WRITEWEBDB" -- Write your database name
DBUser="WRITEUSER" -- Write your username
DBPass="WRITEPASSWD" -- Write your password 
DBHost="WRITEHOST" -- Write Ip to DB // WEB DB

-- Functions
function dbSets(...)
	if not {...} then return end
	local qh = dbQuery(DBHandler, ...)
	if not qh then return false end
	local result, num_affected_rows, last_insert_id = dbPoll(qh, -1)
	return result, num_affected_rows, last_insert_id
end

function dbGets(...)
	if not {...} then return end
	local stringe=dbPrepareString(DBHandler,...)
	local query=dbQuery(DBHandler, stringe)
	local result,num_affected_rows, last_insert_id =dbPoll(query, -1)
	return result
end

addEventHandler("onResourceStart", resourceRoot, function()
	DBHandler=dbConnect("mysql", "dbname="..DBName..";host="..DBHost.."", DBUser, DBPass, "share=1")
	if DBHandler then
		outputDebugString("* Connect to server MYSQL...")
	else
		outputDebugString("* No Connecting to server MYSQL..")
	end
end)

-- -----------------------------------------------------------------------------------



function sendCode(thePlayer,_,codeGet,webId)

    local accSerial = getPlayerSerial( thePlayer ) -- Get user account serial from server
    
    local result = dbGets("SELECT * FROM mta_web_code WHERE serial=?", accSerial) -- Get user web code info

    -- Showing in console new authing
    outputDebugString("- New Code Auth -")
    outputDebugString(codeGet)
    outputDebugString(webId)
    outputDebugString("- - - - - - - - - ")

    if ( codeGet == result[1].code )
        then

        local delCode = dbSets("DELETE FROM mta_web_code WHERE serial=?", accSerial) -- Delete code from DB

        local resultWebAcc = dbGets("SELECT * FROM mta_web_users_accounts WHERE authId=?", webId) -- Get user account


        if ( webId == resultWebAcc[1].authId )
            then
            
            outputChatBox("User Accesed.", thePlayer) -- If all correct.

            local query = dbSets("UPDATE mta_web_users_accounts SET authed=1, serial='"..accSerial.."' WHERE authId='"..webId.."'") -- Change in DB / authing and writing serial to user account

        else

            outputChatBox("User ID is not correct. Generate in site new code and try again.", thePlayer) -- If user ID is not correct

        end

    else

        outputChatBox("Dont find this code", thePlayer) -- If code not found in DB

    end


end
addCommandHandler( "code", sendCode ) -- add command
