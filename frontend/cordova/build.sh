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
cordova build android

# Copy the APK to the distribution directories
#cp platforms/android/app/build/outputs/apk/debug/app-debug.apk ../www/yasla.apk
#cp platforms/android/app/build/outputs/apk/debug/app-debug.apk ../webapp/yasla.apk
rsync -avzr platforms/android/app/build/outputs/apk/debug/app-debug.apk matth@hoskison.co.uk:/var/www/yasla.co.uk/frontend/www/src/yasla.apk

# Post build cleanup: Empty the www directory, but recreate it also - otherwise Cordova gets very confused.
rm -rf www
mkdir www

