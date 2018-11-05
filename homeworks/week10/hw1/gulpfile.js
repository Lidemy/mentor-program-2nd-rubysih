const gulp = require('gulp');
const sass  = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('css', function(){
  return gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
  return gulp.src('./js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    
    
    .pipe(gulp.dest('./build/js'))

});
gulp.task('default', ['css','js']);