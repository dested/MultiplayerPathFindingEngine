var gulp = require('gulp');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var insert = require('gulp-insert');
var watch = require('gulp-watch');
var ftp = require('gulp-ftp');

var codePaths = [
    'Pather.Common/bin/Debug/**/*.js',
    'Pather.Client/bin/Debug/**/*.js',
    'GameLogic/GameLogic.Common/bin/Debug/**/*.js',
    'GameLogic/GameLogic.Client/bin/Debug/**/*.js'
];

var libPaths = ['packages/Saltarelle.Runtime.2.6.2/mscorlib.js'];

var assetPaths = [];
var fontPaths = [];



gulp.task('client.packageScripts', function () {
    return gulp.src(codePaths)
        .pipe(gulp.dest('output/Client/js'));
});


gulp.task('client.packageAssets', function () {

    /* var spriteData = gulp.src(assetPaths)
       .pipe(spritesmith({
           'algorithm': 'binary-tree',
           imgName: 'sprite.png',
           cssName: 'sprite.json'
       }));
   spriteData.img
       .pipe(gulp.dest('output/Client/images'));
   return spriteData.css
       .pipe(insert.transform(function (contents) {
           var sprites = JSON.parse(contents);
           var _sprites = [];
           for (var spriteName in sprites) {
               var sprite = sprites[spriteName];
               delete sprite["image"];
               delete sprite["total_width"];
               delete sprite["total_height"];
               delete sprite["offset_x"];
               delete sprite["offset_y"];
               delete sprite["px"];
               delete sprite["escaped_image"];
               sprite.image = sprite.source_image.replace(/\\/g, '/').replace(clientDir, '');
               delete sprite["source_image"];
               _sprites.push(sprite);
           }

           return 'window.spriteSheetAssets=' + JSON.stringify(_sprites) + ';';
       }))
       .pipe(gulp.dest('output/Client/images'));

*/
    gulp.src(fontPaths)
      .pipe(gulp.dest('output/Client/fonts'));
    return gulp.src(assetPaths)
        .pipe(gulp.dest('output/Client/images'));
});


gulp.task('client.packageLibs', function () {
    return gulp.src(libPaths)
        .pipe(gulp.dest('output/Client/libs'));
});


gulp.task('client.watch', function () {
    gulp.watch(codePaths, ['client.packageScripts', 'client.ftp']);
    gulp.watch(libPaths, ['client.packageLibs', 'client.ftp']);

});
gulp.task('client.ftp', function () {
    return;
    return gulp.src('output/Client/js/**/*.*')
        .pipe(ftp({
            host: global.ftpDomain,
            user: global.ftpUsername,
            pass: global.ftpPassword,
            remotePath: '/httpdocs/path/js'
        }));
});

gulp.task('client.express', function () {
    console.log(process.cwd());
    var express = require('express');
    var http = require('http');
    var app = express();
    app.set('port', 4000);
    app.use(express.static('output/Client'));
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Client Server listening on port ' + app.get('port'));
    });




    var app2 = express();
    app2.set('port', 5000);
    app2.use(express.static('output/Monitor'));
    http.createServer(app2).listen(app2.get('port'), function () {
        console.log('Monitor Server listening on port ' + app2.get('port'));
    });



});