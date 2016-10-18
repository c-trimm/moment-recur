var gulp = require('gulp');

var karma = require('karma').server;
var uglify = require('gulp-uglifyjs');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test continually
 */
gulp.task('test:dev', function (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

gulp.task('compress', function(done) {
  return gulp.src('moment-recur.js')
    .pipe(uglify('moment-recur.min.js'))
    .pipe(gulp.dest('.'))
});

gulp.task('meteor-init', shell.task([
  'type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }',
  'cp meteor/package.js . '
]));

gulp.task('meteor-cleanup', shell.task([
  'rm -rf .build.* versions.json package.js'
]));

gulp.task('meteor-publish', ['meteor-init'], shell.task([
  'meteor publish'
]));

gulp.task('meteor', function() {
  return runSequence('meteor-publish', 'meteor-cleanup');
});

gulp.task('default', function() {
  return runSequence('test','compress')
});
