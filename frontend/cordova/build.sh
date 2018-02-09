#!/usr/bin/env bash

# Clean up the build environment
rm -rf www

# Go into the wepapp directory and do a production build
cd ../webapp/ && gulp build-demo && cd ../cordova

# Copy the webapp source
cp -r ../webapp/ www

# Delete the webapp's node_modules, since that confuses Gradle quite a bit
rm -rf www/node_modules

# DoIt (tm)
cordova build android

# Copy the APK to the distribution directories
cp platforms/android/app/build/outputs/apk/debug/app-debug.apk ../www/yasla.apk
cp platforms/android/app/build/outputs/apk/debug/app-debug.apk ../webapp/yasla.apk

# Post build cleanup: Empty the www directory, but recreate it also - otherwise Cordova gets very confused.
rm -rf www
mkdir www