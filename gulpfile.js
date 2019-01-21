const {
    series,
    parallel,
    src,
    dest,
    watch
} = require('gulp');
const Sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require("gulp-autoprefixer");
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');

function defaultTask(cb) {
    watch('./css/*.scss', sass);
    watch(['./js/*.js', './*.html']).on('change', browserSync.reload);
    browserSync.init({
        server: "./"
    });
    cb();
}

function sass() {
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

function clean() {
    return del(['./minifiedVersion/**', '!./minifiedVersion/.git', './minifiedVersion/*.php']);
}

function copyFiles() {
    return src('./files/*')
        .pipe(dest('./minifiedVersion/files'));
}

function minifyImage() {
    return src('img/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(dest('minifiedVersion/img'));
}

function minifyHtml() {
    return src('./*.html')
        .pipe(usemin({
            css: [rev],
            html: [function() {
                return htmlmin({
                    collapseWhitespace: true
                });
            }],
            js: [uglify, rev],
            inlinejs: [uglify],
            inlinecss: [cleanCss, 'concat']
        }))
        .pipe(dest('minifiedVersion/'));
}

function minifyCss() {
    return src('css/*.css')
        .pipe(cleanCss({
            compatibility: 'ie8'
        }))
        .pipe(dest('minifiedVersion/css'));
}

exports.default = defaultTask
exports.build = series(clean, copyFiles, minifyImage, minifyHtml, minifyCss);
