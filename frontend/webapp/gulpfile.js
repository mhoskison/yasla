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
    htmlreplace = require("gulp-html-replace");

var pkg = require("./package.json");
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
var templates_paths = ["app/src/**/*.html"];
var style_paths = [
    "bower_components/angular-material/angular-material.min.css",
    "bower_components/angular-material-icons/angular-material-icons.css",
    "app/src/**/*.less"
];
var dist_path = "app/dist";
var deploy_path = "app/deploy";
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
        oauth_client_id:     2,
        oauth_client_secret: "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW"
    }
};


/***********************************************************************************************************************
 * File watchers
 */
gulp.task("watch-code", function (done) {
    console.log("Code watchers are running!!");
    return gulp.watch(source_paths, ["build-code"]);
});
gulp.task("watch-css", function (done) {
    console.log("Style watchers are running.");
    return gulp.watch(style_paths, ["build-css"]);
});

/***********************************************************************************************************************
 * Common tasks
 */
gulp.task("common-bower", function (done) {
    return gulp.src(bower_paths)
        .pipe(concat_to("bower.js"))
        .pipe(gulp.dest(dist_path));
});
gulp.task("common-css", function (done) {
    return gulp.src(style_paths)
        .pipe(less())
        .pipe(concat_to("app.css"))
        .pipe(gulp.dest(dist_path));
});

/***********************************************************************************************************************
 * Development tasks
 */
gulp.task("default", sequence("common-bower", "common-css", "dev-code", ["watch-code", "watch-css"]));
gulp.task("dev-code", function (done) {
    var mode = "dev";
    return gulp.src(source_paths)
        .pipe(replace("// ---- REPLACE: APP_VERSION", pkg.version))
        .pipe(replace("// ---- REPLACE: API_URL", replacements[mode].api_url))
        .pipe(replace("// ---- REPLACE: AUTH_URL", replacements[mode].auth_url))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", replacements[mode].oauth_client_id))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", replacements[mode].oauth_client_secret))
        .pipe(concat_to("app.js"))
        .pipe(gulp.dest(dist_path));
});

/***********************************************************************************************************************
 * Deployment tasks
 */
gulp.task("deploy", sequence(["common-css", "minify-css"], ["deploy-code", "deploy-html", "deploy-templates", "deploy-assets"]));
gulp.task("minify-css", function (done) {
    gulp.src("app/dist/app.css")
        .pipe(minify_css())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(deploy_path));
    done();
});
gulp.task("deploy-code", function (done) {
    var mode = "live";
    gulp.src(source_paths)
        .pipe(replace("// ---- REPLACE: APP_VERSION", pkg.version))
        .pipe(replace("// ---- REPLACE: API_URL", replacements[mode].api_url))
        .pipe(replace("// ---- REPLACE: AUTH_URL", replacements[mode].auth_url))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_ID", replacements[mode].oauth_client_id))
        .pipe(replace("// ---- REPLACE: OAUTH_CLIENT_SECRET", replacements[mode].oauth_client_secret))
        .pipe(concat_to("app.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(ngAnnotate())
        .pipe(minify_js())
        .pipe(gulp.dest(deploy_path));

    gulp.src(bower_paths)
        .pipe(concat_to("bower.js"))
        // .pipe(minify_js())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(deploy_path));

    done();
});
gulp.task("deploy-html", function (done) {
    return gulp.src("app/index.html")
        .pipe(htmlreplace(
            {rep1: "<script src=\"bower.min.js\"></script><script src=\"app.min.js\"></script><script src=\"templates.js\"></script><link rel=\"stylesheet\" href=\"app.min.css\">"}
        ))
        .pipe(gulp.dest(deploy_path));
});
gulp.task("deploy-templates", function (done) {
    return gulp.src(templates_paths)
        .pipe(ngTemplates({module: "yasla", root: "src/"}))
        .pipe(gulp.dest(deploy_path));
});
gulp.task("deploy-assets", function (done) {
    return gulp.src("app/dist/assets/**")
        .pipe(copy(deploy_path, {prefix: 2}))
        .pipe(gulp.dest(deploy_path));
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



