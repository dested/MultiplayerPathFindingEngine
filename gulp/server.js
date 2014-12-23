var gulp = require('gulp');


var concat = require('gulp-concat');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var insert = require('gulp-insert');
var watch = require('gulp-watch');

var codePaths = [
    'Pather.Common/bin/Debug/**/*.js',
    'Pather.Servers/bin/Debug/**/*.js',
];

var libPaths = ['packages/Saltarelle.Runtime.2.6.2/mscorlib.js'];


gulp.task('server.packageScripts', function () {
    return gulp.src(codePaths)
        .pipe(replace('require(\'mscorlib\');', ''))
        .pipe(gulp.dest('output/Server/js'));
});  

gulp.task('server.packageLibs', function () {
    return gulp.src(libPaths)
        .pipe(gulp.dest('output/Server/libs'));
});


gulp.task('server.watch', function () {
    gulp.watch(codePaths, ['server.packageScripts']);
    gulp.watch(libPaths, ['server.packageLibs']);
});
 