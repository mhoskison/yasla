var gulp      = require("gulp"),
    sequence  = require("gulp-sequence"),
    less      = require("gulp-less"),
    cleanCss  = require("gulp-clean-css"),
    minifyCss = require("gulp-minify-css"),
    jshint    = require("gulp-jshint"),
    concat_to = require("gulp-concat"),
    clean     = require("gulp-clean"),
    replace   = require("gulp-replace"),
    util      = require("gulp-util"),
    watcher   = require("gulp-watch"),
    bump      = require("gulp-bump"),
    pkg       = require("./package.json");

var bower_paths = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/angular/angular.min.js",
    "bower_components/angular-animate/angular-animate.min.js",
    "bower_components/angular-aria/angular-aria.min.js",
    "bower_components/angular-material/angular-material.min.js",
    "bower_components/angular-material-icons/angular-material-icons.min.js",
    "bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "bower_components/angular-local-storage/dist/angular-local-storage.min.js",
    "bower_components/moment/min/moment-with-locales.min.js",
    "bower_components/angular-messages/angular-messages.min.js",
    "bower_components/angular-ui-layout/src/ui-layout.js",
    "bower_components/sprintf/dist/sprintf.min.js",
    "bower_components/angular-resource/angular-resource.min.js",
    "bower_components/angular-ui/build/angular-ui.min.js",
    "bower_components/zxcvbn/dist/zxcvbn.js"
];
var source_paths = ["app/src/**/*.js"];
var style_paths = [
    "bower_components/angular-material/angular-material.min.css",
    "bower_components/angular-material-icons/angular-material-icons.css",
    "app/src/**/*.less"
];
var dist = "app/dist";

gulp.task("default", sequence("build-bower", "build-css", "build-code", ["watch-code", "watch-css"]));
gulp.task("watch-code", function (done) {
    console.log("Code watchers are running!!");
    return gulp.watch(source_paths, ["build-code"]);
});
gulp.task("watch-css", function (done) {
    console.log("Style watchers are running.");
    return gulp.watch(style_paths, ["build-css"]);
});

gulp.task("build-bower", function (done) {
    return gulp.src(bower_paths)
        .pipe(concat_to("bower.js"))
        .pipe(gulp.dest(dist));
});
gulp.task("build-code", function (done) {
    return gulp.src(source_paths)
        .pipe(replace("// ---- REPLACE: APP_VERSION", pkg.version))
        .pipe(replace("// ---- REPLACE: API_URL", "http://dev.api.yasla.co.uk/api"))
        .pipe(replace("// ---- REPLACE: AUTH_URL", "http://dev.api.yasla.co.uk"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", "2"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW"))
        .pipe(concat_to("app.js"))
        .pipe(gulp.dest(dist));
});
gulp.task("build-css", function (done) {
    return gulp.src(style_paths)
        .pipe(less())
        .pipe(concat_to("app.css"))
        .pipe(gulp.dest(dist));
});
gulp.task("bump-build-number", function (done) {
    console.log("*** Starting bump-version");
    gulp.src(["./package.json"])
        .pipe(bump({type: "prerelease"}))
        .pipe(gulp.dest("./"));
    console.log("*** Finished bump-version");

    var p = require("./package.json");
    console.log("*** New version: [%s]", p.version);
    done();
});



