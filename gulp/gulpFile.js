

var gulp = require('gulp');
var gutil = require('gulp-util');
//require('./passwords');
require('./client');
require('./server');
var runSequence = require('run-sequence');


gulp.task('default', function (callback) {
    process.chdir('../');

    var c = 0;
    var done=function() {
        c++;
        if (c == 2) {
            callback();
        }
    }

    runClient(done);
    runServer(done);

    
});

gulp.task('client', function (callback) {
    process.chdir('../');
    runClient(callback);
});

gulp.task('client-express', function (callback) {
    process.chdir('../');
    runSequence('client.express',callback);
});

gulp.task('server', function (callback) {
    process.chdir('../');
    runServer(callback);
});



function runClient(callback) {
    runSequence(
    [
        'client.packageAssets',
        'client.packageScripts',
        'client.packageLibs'
    ],
    'client.watch',
    'client.express',
    'client.ftp',
    callback);
}
function runServer(callback) {
    runSequence(
        [
            'server.packageScripts',
            'server.packageLibs'
        ],
        'server.watch',
        callback);
}
