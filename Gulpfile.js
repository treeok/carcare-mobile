/**
 * Created by claire on 2015/6/25.
 */
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
/*imagemin = require('gulp-imagemin'),
 pngquant = require('imagemin-pngquant'),*/
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('public', {read: false}).pipe(clean());
});

//样式
gulp.task('css', function () {
    return gulp.src(['./src/css/*.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});
gulp.task('lib', function () {
    return gulp.src(['./src/lib/**/*.*','./src/lib/*.*'])
        .pipe(gulp.dest('./public/lib'))
        .pipe(livereload());
});


gulp.task('config', function () {
    return gulp.src(['./src/config.js'])
        .pipe(gulp.dest('./public/'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src(['./src/script/**/*.js','./src/script/*.js'])
        .pipe(gulp.dest('./public/script'))
        .pipe(livereload());
});

gulp.task('img', function () {
    return gulp.src(['./src/img/*.png','./src/img/*.jpg','./src/img/*.ico'])
        .pipe(gulp.dest('./public/img'));
});

gulp.task('jade2html',['css','js','img','config','lib'], function () {
    return gulp.src(['./view/*.jade','./view/**/*.jade'])
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('default',['jade2html'], function () {
    livereload.listen();
    gulp.watch(['./view/*.jade','./view/**/*.jade', './src/img/*.png','./src/img/*.ico', './src/script/**/*.js','./src/config.js','./src/css/*.css'],['jade2html','img','js','config','css']);
});