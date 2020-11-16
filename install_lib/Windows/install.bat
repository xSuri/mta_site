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

npm install --save

echo "Installed all liblaries"


:end

echo "Program stopped."
pause