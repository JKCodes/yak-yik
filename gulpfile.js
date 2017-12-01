var gulp = require('gulp');
var to5 = require('gulp-6to5');
var less = require('gulp-less');
var gp_concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');


gulp.task('es6-es5', function() {
  return gulp.src([
        './src/serverapp.js',
        './src/*/**.js',
        './src/*/*/**.js'
      ]
    )
    .pipe(to5())
    .pipe(gulp.dest('./public/dist/es5/'))
})

gulp.task('js', function() {
  return gulp.src(
      [
        './public/js/jquery.js',
        './public/js/plugins.js',
        './public/js/functions.js'
      ]
    )
    .pipe(gp_concat('gulp-concat.js'))
    .pipe(gulp.dest('./public/min/'))
    .pipe(gp_rename('vendor.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('./public/dist/js/'));
})

gulp.task('css', function() {
  return gulp.src(
      [
        './public/css/googlefonts.css',
        './public/css/bootstrap.css',
        './public/css/style.css',
        './public/css/swiper.css',
        './public/css/dark.css',
        './public/css/font-icons.css',
        './public/css/animate.css',
        './public/css/magnific-popup.css',
        './public/css/responsive.css'
      ]
    )
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gp_concat('style.min.css'))
    .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('less', function() {
  gulp.src('./public/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {
  gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js'], ['es6-es5'])
})

gulp.task('default', ['es6-es5', 'less', 'css', 'js', 'watch'], function(){})