# MTA Code and Site

# Basic work

Watch film:

[![Watch the video](https://img.youtube.com/vi/p_kWb7se5cQ/maxresdefault.jpg)](https://youtu.be/p_kWb7se5cQ)


# Requirements

[NodeJs](https://nodejs.org/en/)

Any DB's

Go to `/database` and import the basic local DB to your DB server. ( All files: `name_file.sql` ) - ``DB WEB``. Import [`/databases/SITE`](https://github.com/xSuri/mta_site/tree/main/databases/SITE)

You must have your DB to mta game users - ``DB MTA``. Import [`/databases/GAME`](https://github.com/xSuri/mta_site/tree/main/databases/GAME)

Write all your basic info to files: 

[SITE](https://github.com/xSuri/mta_site/tree/main/mta_code_server_and_site/site)

[GAME](https://github.com/xSuri/mta_site/tree/main/mta_code_server_and_site/server/mta_code_web_lua) (code_lua)

```
    site:

        databases:
            db1 / db2

        passports:
            passport-google
            passport-youtube3
            passport-github
            passport-facebook

    mta_code_web_lua:
    
        server.lua
```

Install liblary:

Automatic:

Install all require liblary ( [`/install_lib`](https://github.com/xSuri/mta_site/tree/main/install_lib) ). ([Linux](https://github.com/xSuri/mta_site/tree/main/install_lib/Linux) / [Windows](https://github.com/xSuri/mta_site/tree/main/install_lib/Windows))

[Manual](https://github.com/xSuri/mta_site/tree/main/install_lib/Manual):

``` npm install _MODULES_ --save``` (click Manual to get all liblary names)

rest info to db and any info in [basic_important_info.md](https://github.com/xSuri/mta_site/blob/main/basic_important_info.md)

# Tested

Program have commented lines to beta features. Admin Panel. Authenticator (he not commented change to user db [mta_web_users_accounts] authenticator_on to value 1)

# Start

Go to [`/mta_code_server_and_site/site/`](https://github.com/xSuri/mta_site/tree/main/mta_code_server_and_site/site)

And start command:

``` "node server.js" OR "nodemon server.js" ```

# Info
I am constantly improving my own skills and so far I do not share my projects very much, I am aware of many possible errors.


All "scripts" etc. belong to the owner (suri / xSuri). Signing them without the consent of the owner is prohibited. You can modify, download them and you have to give their rightful creator. All my projects arose suddenly and I am warning you that I am learning, among others. this language. All my designs are free and you can use them freely. Any errors or suggestions can be directed to the owner (i.e. me). Have a nice use of C:

©Copyright 2020/2021 suri
MTA Code and Site

# Authors

[suri](https://github.com/xSuri)

[lLYNXl](https://github.com/lLYNXl) - css / frontend
