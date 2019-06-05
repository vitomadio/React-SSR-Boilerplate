let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let minify = require('gulp-minify');
let rename = require('gulp-rename');
var gcmq = require('gulp-group-css-media-queries');


gulp.task('css', () => {
  return gulp.src('assets/css/*.css')
    .pipe(gcmq())
    .pipe(rename('styles-min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', () => {
  return gulp.src('assets/js/*.js')
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', gulp.series('css', 'js'));