var gulp           = require('gulp');
var sass           = require('gulp-sass')(require('sass'));
var rename         = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
var browserSync    = require('browser-sync').create();
const image = require('gulp-image');



gulp.task('image', function () {
  return gulp.src('./images/**/*')
    .pipe(image(
      {
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
      }
    ))
    .pipe(gulp.dest('./imagemin'));
});



function buildStyles(done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError))
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream()); //всегда в конце
  done()
};

gulp.task(buildStyles)




function sync(done) {
  browserSync.init({
      server: {
          baseDir: "./"
      },
port:3000
  });
}
// для browserSync


function browerReload(done) {
  browserSync.reload();
  done();
}
// для browserSync


function watchFiles(){
  gulp.watch("./scss/**/*", buildStyles);
  gulp.watch("./**/*.html", browerReload);
  gulp.watch("./**/*.php", browerReload);
  gulp.watch("./**/*.js", browerReload);

}
function watchSass(){
  gulp.watch("./scss/style.scss", buildStyles)
  // gulp.watch("./js/**/*", js_style)
}
// данная ф-я следит постоянно на наличие изменений в файле style.scss и если будет изменение запустит ф-ю buildStyles. Можно отслеживать несколько задач.
// можно при создании еще нескольих scss попробовать поставить ./scss/**/*.scss





//gulp.task('default', gulp.series(watchSass));
// здесь можно перечислить ф-и по дефолту какие будут срабатывать при команде gulp(в порядке очереди расписанной)

gulp.task('default', gulp.parallel(watchFiles, sync, watchSass));
gulp.task(sync) //попробовать без этого
