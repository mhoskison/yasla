var gulp      = require("gulp"),
    sequence  = require("gulp-sequence"),
    less      = require("gulp-less"),
    cleanCss  = require("gulp-clean-css"),
    minifyCss = require("gulp-minify-css"),
    jshint    = require("gulp-jshint"),
    concat_to = require("gulp-concat"),
    clean     = require("gulp-clean"),
    replace   = require("gulp-replace"),
    watcher   = require("gulp-watch");

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

gulp.task("clean-build", function (done) {
    return gulp.src("build", {
        read:       false,
        allowEmpty: true
    })
        .pipe(clean());
});

// ---- Transpile the LESS styles into plain CSS
//
gulp.task("concat-less", function (done) {
    return gulp.src
    ([
         "bower_components/angular-material/angular-material.min.css",
         "app.less",
         "states/**/*.less"
     ])
        .pipe(less())
        .pipe(concat_to("app.css"))
        .pipe(gulp.dest("dist/"));

});
gulp.task("jshint", function () {
    return gulp.src("states/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});
gulp.task("concat-bower", function (done) {
    return gulp.src(bower_paths)
        .pipe(concat_to("bower.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("concat-code-dev", function (done) {
    return gulp.src(["app.js", "states/**/*.js"])
        .pipe(replace("// ---- REPLACE: API_URL", "var api_url=\"http://dev.api.yasla.co.uk\";"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", "2"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW"))
        .pipe(concat_to("app.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("concat-code-demo", function (done) {
    return gulp.src(["app.js", "states/**/*.js"])
        .pipe(replace("// ---- REPLACE: API_URL", "var api_url=\"https://api.yasla.co.uk\";"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", "1"))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", "TQF7BYvWUWdCw3DOB0w1govvYfpO6riuKl20luK9"))
        .pipe(concat_to("app.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("build-dev", ["clean-build", "concat-less", "concat-bower", "concat-code-dev"]);
gulp.task("build-demo", ["clean-build", "concat-less", "concat-bower", "concat-code-demo"]);

gulp.task("watch-less", function () {
    return gulp.watch(["app.less", "states/**/*.less"], ["concat-less"]);
});
gulp.task("watch-code", function () {
    return gulp.watch(["app.js", "states/**/*.js"], ["concat-code-dev"]);
});

/**
 *  Default task
 *  ------------
 *
 *  The default gulp task keeps everything working in the development environment.
 */
gulp.task("default", ["build-dev", "watch-less", "watch-code"]);