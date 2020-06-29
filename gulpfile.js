let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
   return gulp.src('app/sass/**/*.sass')
       .pipe(sass({outputStyle: 'compressed'}))
       .pipe(rename({
          suffix: '.min'
       }))
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
   return gulp.src('app/**/*.html')
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
   return gulp.src('app/js/main.js')
       .pipe(uglify())
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(gulp.dest('app/js/'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "app/"
      }
   });
});

gulp.task('watch', function () {
   gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
   gulp.watch('app/**/*.html', gulp.parallel('html'));
   gulp.watch('app/js/**/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));