

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  jade = require('gulp-jade'),
  compass = require('gulp-compass'),
  imp = require('compass-importer');

// ////////////////////////////////////////////////
// Log Error
// // /////////////////////////////////////////////

function errorlog(err){
  console.error(err.message);
  this.emit('end');
}


// ////////////////////////////////////////////////
// Scripts Tasks
// ///////////////////////////////////////////////

gulp.task('scripts', function() {
  return gulp.src('build/js/**/*.js')
    .pipe(concat('temp.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))   
    .pipe(gulp.dest('./app/js/'))
    .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Styles Task
// ///////////////////////////////////////////////

gulp.task('compass', function() {
  gulp.src('build/sass/style.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'bulid/sass'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/css/'));
});



// ////////////////////////////////////////////////
// HTML Tasks
// // /////////////////////////////////////////////

gulp.task('html', function(){
    gulp.src('*.html')
    .pipe(reload({stream:true}));
});
gulp.task('css', function(){
    gulp.src('css/*.css')
    .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// ////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////

gulp.task ('watch', function(){ 
  gulp.watch('sass/**/*.scss', ['compass']);
        gulp.watch('css/**/*.css', ['css']);
        gulp.watch('templates/**/*.jade', ['jade']);
    gulp.watch('*.html', ['html']);
});
//////////////////////////////////////////////////
// JADE
/////////////////////////////////////////////////
gulp.task('jade', function() {
  gulp.src('templates/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./'))
    
});

gulp.task('default', [ 'html', 'watch','css', 'compass','scripts','browser-sync']);

