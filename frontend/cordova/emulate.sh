#!/usr/bin/env bash

# Clean up the build environment
rm -rf www

# Go into the wepapp directory and do a production build
#cd ../webapp/ &&  ./node_modules/gulp/bin/gulp.js build-dev && cd ../cordova

# Copy the webapp source, but delete our copy of node_modules since that confuses Gradle immensely.
cp -r ../webapp/app www

# DoIt (tm)
cordova emulate android
#cp platforms/android/app/build/outputs/apk/debug/app-debug.apk ../webapp/yasla.apk
