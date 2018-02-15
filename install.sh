#!/usr/bin/env bash

# Install Laravel packages

cd backend/laravel5.5
composer install

# Install front end NPM modules

cd ../../frontend/webapp
npm install