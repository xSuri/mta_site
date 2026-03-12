# MTA:SA Server & Web Integration Suite

Kompleksowy system integracji serwera MTA:SA z panelem webowym. Projekt umożliwia zaawansowaną synchronizację kont graczy, autoryzację OAuth oraz zdalne zarządzanie serwerem gry z poziomu przeglądarki.

### 📺 Prezentacja wideo / Video Demo
https://youtu.be/GWm5nIZRac4

---

## 🛠 Funkcjonalności / Features
* Multi-Database Sync: Synchronizacja danych między bazą strony (DB WEB) a bazą kont gry (DB MTA).
* OAuth Integration: Logowanie przez Google, GitHub, Facebook oraz YouTube za pomocą Passport.js.
* Admin Panel: Moduł zarządzania infrastrukturą serwera (faza beta).
* Two-Factor Authentication: Implementacja systemu autoryzacji (2FA).

---

## 🚀 Konfiguracja i Instalacja / Setup

### 1. Wymagania / Requirements
* Node.js
* Serwer MySQL / MariaDB

### 2. Baza danych / Database
Zaimportuj schematy SQL znajdujące się w katalogu /database:
* Web Interface: Importuj pliki z /databases/SITE do bazy strony.
* Game Server: Importuj pliki z /databases/GAME do bazy serwera MTA.

### 3. Konfiguracja połączeń / Configuration
Zaktualizuj dane w plikach:
* Web: /mta_code_server_and_site/site/ (baza danych i klucze API OAuth).
* Game: /mta_code_server_and_site/server/mta_code_web_lua/server.lua.

### 4. Instalacja bibliotek / Installation
Skorzystaj ze skryptów w /install_lib lub wykonaj ręcznie:
npm install

---

## 🚦 Uruchomienie / Getting Started
Przejdź do katalogu strony i uruchom serwer Node.js:

cd mta_code_server_and_site/site
node server.js

*Możesz również użyć "nodemon server.js" dla trybu deweloperskiego.*

---

## 📄 Autorzy i Licencja / Authors & License
* Project Lead & Backend: https://github.com/xSuri
* Frontend & UI/UX: https://github.com/lLYNXl

Legal Note: Projekt udostępniony do darmowego użytku i modyfikacji. Wymagane jest zachowanie informacji o autorze. Projekt ma charakter rozwojowy (R&D) – autor nie odpowiada za ewentualne błędy.

© 2020-2021 xSuri
