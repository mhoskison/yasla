#!/usr/bin/env bash

# Clean up old build
rm -rf app
mkdir app/dist -p
cp package.json app/
cp main.js app/

# Go into the wepapp directory and do a production build
#cd ../webapp/ && gulp build-dev && cd ../electron

# Copy the webapp source
cp -r ../webapp/dist/* app/dist/
cp -r ../webapp/index.html app/
cp -r ../webapp/states app

# DoIt (tm)
cd app
electron .