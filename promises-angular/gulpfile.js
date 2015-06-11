var gulp = require('gulp');
var connect = require('gulp-connect');
var url = require('url');
var proxy = require('proxy-middleware');

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 3200,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('./js/**/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);