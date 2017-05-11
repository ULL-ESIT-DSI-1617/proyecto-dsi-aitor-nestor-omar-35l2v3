var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task("test", shell.task("./node_modules/mocha/bin/mocha --require should"))