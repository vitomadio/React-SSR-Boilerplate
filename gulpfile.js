let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let minify = require('gulp-minify');
let rename = require('gulp-rename');

 
gulp.task('css', () => {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles-min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
  gulp.src('assets/js/*.js')
    .pipe(minify({
    	noSource: true
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', gulp.series('css', 'js'));