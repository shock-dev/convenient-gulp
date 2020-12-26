const { src, dest, watch } = require('gulp')
const scss = require('gulp-sass')
const concat = require('gulp-concat')

function styles() {
    return src('./src/scss/index.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('index.min.css'))
        .pipe(dest('./dist/css'))
}

function watching() {
    watch(['src/scss/**/*.scss'], styles)
}

exports.styles = styles
exports.watching = watching
