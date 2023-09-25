const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');

gulp.task("html", function () {
    return gulp.src("app/*.html").pipe(gulp.dest("dist"));
  });
  
gulp.task("sass", function () {
    return gulp.src("app/sass/*.sass")
    .pipe(concat("styles.scss"))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"], cascade: false,}))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
  });
gulp.task("scripts", function () {
    return gulp
    .src("app/js/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"));
  });
gulp.task("watch", function () {
    gulp.watch("app/*.html", gulp.series("html"));
    gulp.watch("app/js/*.js", gulp.series("scripts"));
    gulp.watch("app/sass/*.sass", gulp.series("sass"));
    //gulp.watch("app/img/*.{jpg,jpeg,png,gif}", gulp.series("imgs"));
  });