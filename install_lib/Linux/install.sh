#!/bin/bash

echo "Installing liblaries \n"

echo "Install liblaries? (y/n) \n"
read liblary

yes="y"

if [ "$liblary" = "$yes" ];
    then
    echo "Installing..."

    cd ..
    cd ..
    cd /mta_code_server_and_site
    cd /site

    npm install --save

    echo "Installed all liblaries"
fi


echo "Program stopped."