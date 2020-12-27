const { src, dest, watch, parallel, series } = require('gulp')
const scss = require('gulp-sass')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const fileinclude = require('gulp-file-include')

const styles = () => (
    src('./src/scss/index.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
)

const imgToDist = () => (
    src(['./src/img/**.jpg', './src/img/**.jpeg', './src/img/**.png'])
        .pipe(dest('./dist/img'))
)

const htmlInclude = () => (
    src('./src/index.html')
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
)

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })

    watch('./src/scss/**/*.scss', styles)
    watch('./src/index.html', htmlInclude)
    watch(['./src/img/**.jpg', './src/img/**.jpeg', './src/img/**.png'], imgToDist)
}

exports.styles = styles
exports.watchFiles = watchFiles

exports.default = series(htmlInclude, styles, imgToDist, watchFiles)
