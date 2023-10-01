const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const browser_sync = require("browser-sync").create();
const debug = require("gulp-debug");
const opt = { title: "log", showCount: false };

function browserSync() {
  browser_sync.init({                // Ініціалізація browser_sync
      server: { baseDir: "build/" }, // Встановлюємо базову директорію
      notify: false,                 // Вимикаємо інформаційні сповіщення
      online: true                   /* Дозволяємо підключення пристроїв через 
                                        локальну мережу (напр. смартфонів, планшетів і т.д.) */
  })
}
gulp.task("html", function () {
    return gulp.src("app/*.html").pipe(gulp.dest("dist"));
});
  
gulp.task("css", function (){
    return gulp.src("app/css/*.css")
    .pipe(concat("style.css"))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"], cascade: false,}))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browser_sync.stream());
})

gulp.task("scripts", function () {
  return gulp
  .src("app/js/*.js")
  .pipe(concat("script.js"))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("dist/js"))
  .pipe(browser_sync.stream());
});
gulp.task('imgs', function (){
  return gulp
  .src("app/img")

});
gulp.task("watch", function () {
    gulp.watch("app/*.html", gulp.series("html"));
    gulp.watch("app/js/*.js", gulp.series("scripts"));
    gulp.watch("app/css/*.css", gulp.series("css"));
    gulp.watch("app/img/*.{jpg,jpeg,png,gif}", gulp.series("imgs"));
  });