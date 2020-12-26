const { src, dest } = require('gulp')
const scss = require('gulp-sass')
const concat = require('gulp-concat')

const styles = () => src('./src/scss/index.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('index.min.css'))
    .pipe(dest('./dist/css'))

exports.styles = styles
