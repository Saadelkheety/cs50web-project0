const { series, parallel, src, dest, watch } = require('gulp');
const Sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require("gulp-autoprefixer");

function defaultTask(cb) {
  watch('./css/*.scss', sass);
  watch(['./js/*.js', './*.html']).on('change', browserSync.reload);
  browserSync.init({
      server: "./"
    });
  cb();
}

function sass(){
    return src('./css/*.scss')
    .pipe(Sass().on('error', Sass.logError))
    .pipe(
          autoprefixer({
            browsers: ["last 2 versions"]
          })
        )
    .pipe(dest('./css'))
    .pipe(browserSync.stream());;
}

exports.default = defaultTask
// const gulp = require("gulp");
// const sass = require("gulp-sass");
// const autoprefixer = require("gulp-autoprefixer");
// const browserSync = require("browser-sync").create();
//
//
// gulp.task("styles", function(done) {
//   gulp
//     .src("css/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(
//       autoprefixer({
//         browsers: ["last 2 versions"]
//       })
//     )
//     .pipe(gulp.dest("./css"))
//     .pipe(browserSync.stream());
//     done();
// });
//
// gulp.task("default",  gulp.series("styles", function(done) {
//   gulp.watch("sass/**/*.scss", gulp.series("styles"));
//
//   browserSync.init({
//     server: "./"
//   });
//   done();
// }));
