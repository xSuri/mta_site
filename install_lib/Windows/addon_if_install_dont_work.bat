@echo off

echo "Installing liblaries"

@choice /C yn /M "Install liblaries? (y/n) "


if errorlevel = 2 goto end

if errorlevel = 1 goto install

:install

echo "Installing..."

cd ..
cd ..
cd .\mta_code_server_and_site\site\

npm install body-parser --save
npm install connect-flash --save
npm install cookie-parser --save
npm install express --save
npm install express-session --save
npm install flash --save
npm install hbs --save
npm install mysql --save
npm install parser --save
npm install passport --save
npm install passport-facebook --save
npm install passport-github2 --save
npm install passport-google-oauth20 --save
npm install passport-youtube-v3 --save
npm install qrcode --save
npm install speakeasy --save
npm install uuid --save

echo "Installed all liblaries"


:end

echo "Program stopped."
pause