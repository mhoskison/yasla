#!/usr/bin/env bash

# Clean up the build environment
cd ../cordova
rm -rf www

# Go into the wepapp directory and do a production build
cd ../webapp/ && gulp build && cd ../cordova

# Copy the ready-to-be-deployed source
mkdir www
cp -r ../webapp/app/deploy/* ./www

# DoIt (tm)
cordova emulate android