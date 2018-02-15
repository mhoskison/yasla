var gulp        = require("gulp"),
    sequence    = require("gulp-sequence"),
    less        = require("gulp-less"),
    copy        = require("gulp-copy"),
    minify_css  = require("gulp-cssmin"),
    minify_js   = require("gulp-uglify"),
    rename      = require("gulp-rename"),
    jshint      = require("gulp-jshint"),
    concat_to   = require("gulp-concat"),
    clean       = require("gulp-clean"),
    replace     = require("gulp-replace"),
    util        = require("gulp-util"),
    watcher     = require("gulp-watch"),
    bump        = require("gulp-bump"),
    flatten     = require("gulp-flatten"),
    ngAnnotate  = require("gulp-ng-annotate"),
    ngTemplates = require("gulp-angular-templatecache"),
    cordova     = require("gulp-cordova"),
    htmlreplace = require("gulp-html-replace");

var pkg = require("./package.json");
var paths = {
    bower:     [
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
    ],
    source:    [
        "app/src/**/*.js"
    ],
    templates: [
        "app/src/**/*.html"
    ],
    styles:    [
        "bower_components/angular-material/angular-material.min.css",
        "bower_components/angular-material-icons/angular-material-icons.css",
        "app/src/**/*.less"
    ],
    assets:    [
        "app/src/assets/**"],
    dist:      "app/dist",
    deploy:    "app/deploy"
};
var replacements = {
    "dev":  {
        api_url:             "http://dev.api.yasla.co.uk/api",
        auth_url:            "http://dev.api.yasla.co.uk",
        oauth_client_id:     2,
        oauth_client_secret: "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW"
    },
    "live": {
        api_url:             "https://api.yasla.co.uk/api",
        auth_url:            "https://api.yasla.co.uk",
        oauth_client_id:     1,
        oauth_client_secret: "TQF7BYvWUWdCw3DOB0w1govvYfpO6riuKl20luK9"
    }
};

/***********************************************************************************************************************
 * Top-level targets
 */
gulp.task("default", sequence("common-bower", "common-css", "dev-code"));
gulp.task("watch", sequence("default", ["watch-code", "watch-css"]));
gulp.task("build", sequence(["common-css", "minify-css"], ["deploy-code", "deploy-html", "deploy-templates", "deploy-assets"]));

/***********************************************************************************************************************
 * Version management
 */
gulp.task("bump-build-number", sequence("real-bump-build-number", "default"));
gulp.task("real-bump-build-number", function (done) {
    console.log("*** Starting bump-version");
    gulp.src(["./package.json"])
        .pipe(bump({type: "prerelease"}))
        .pipe(gulp.dest("./"));
    console.log("*** Finished bump-version");

    var p = require("./package.json");
    console.log("*** New version: [%s]", p.version);

    done();
});

/***********************************************************************************************************************
 * File watchers
 */
gulp.task("watch-code", function (done) {
    return gulp.watch(paths.source, ["dev-code"]);
});
gulp.task("watch-css", function (done) {
    return gulp.watch(paths.styles, ["common-css"]);
});

/***********************************************************************************************************************
 * Common tasks
 */
gulp.task("common-bower", function (done) {
    return gulp.src(paths.bower)
        .pipe(concat_to("bower.js"))
        .pipe(gulp.dest(paths.dist));
});
gulp.task("common-css", function (done) {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(concat_to("app.css"))
        .pipe(gulp.dest(paths.dist));
});

/***********************************************************************************************************************
 * Development tasks
 */
gulp.task("dev-code", function (done) {
    var mode = "dev";
    return gulp.src(paths.source)
        .pipe(replace("// ---- REPLACE: APP_VERSION", pkg.version))
        .pipe(replace("// ---- REPLACE: API_URL", replacements[mode].api_url))
        .pipe(replace("// ---- REPLACE: AUTH_URL", replacements[mode].auth_url))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", replacements[mode].oauth_client_id))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", replacements[mode].oauth_client_secret))
        .pipe(concat_to("app.js"))
        .pipe(gulp.dest(paths.dist));
});

/***********************************************************************************************************************
 * Deployment tasks
 */
gulp.task("minify-css", function (done) {
    return gulp.src(paths.dist + "/app.css")
        .pipe(minify_css())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.deploy));
});
gulp.task("deploy-code", function (done) {
    var mode = "live";
    gulp.src(paths.source)
        .pipe(replace("// ---- REPLACE: APP_VERSION", pkg.version))
        .pipe(replace("// ---- REPLACE: API_URL", replacements[mode].api_url))
        .pipe(replace("// ---- REPLACE: AUTH_URL", replacements[mode].auth_url))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", replacements[mode].oauth_client_id))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", replacements[mode].oauth_client_secret))
        .pipe(concat_to("app.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(ngAnnotate())
        .pipe(minify_js())
        .pipe(gulp.dest(paths.deploy));

    gulp.src(paths.bower)
        .pipe(concat_to("bower.js"))
        // .pipe(minify_js())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.deploy));

    done();
});
gulp.task("deploy-html", function (done) {
    return gulp.src("app/src/index.html")
        .pipe(htmlreplace(
            {rep1: "<script src=\"bower.min.js\"></script><script src=\"app.min.js\"></script><script src=\"templates.js\"></script><link rel=\"stylesheet\" href=\"app.min.css\">"}
        ))
        .pipe(gulp.dest(paths.deploy));
});
gulp.task("deploy-templates", function (done) {
    return gulp.src(paths.templates)
        .pipe(ngTemplates({module: "yasla", root: ""}))
        .pipe(gulp.dest(paths.deploy));
});
gulp.task("deploy-assets", function (done) {
    return gulp.src(paths.assets)
        .pipe(copy(paths.deploy, {prefix: 2}));
});



