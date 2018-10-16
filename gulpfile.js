/**
 * Node already supports a lot of ES2015,
 * to avoid compatibility problem we suggest to install Babel
 * and rename your gulpfile.js as gulpfile.babel.js.
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

/**
 * Global Variables section
 * In this section we define global variables
 */
const dirs = {
  src: 'src',
  dest: 'build'
};

var paths = {
  styles: {
    src: `${dirs.src}/styles/style.scss`,
    dest: `${dirs.dest}/styles/`
  },
  scripts: {
    src: `${dirs.src}/scripts/script.js`,
    dest: `${dirs.dest}/scripts/`
  }
};

/**
 * Styles section
 * In this section we define functionality who doing style stuff
 */
const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Script section
 * In this section we define functionality who doing JS stuff ;)
 */
const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(paths.scripts.dest))
}

/**
 * Gulp Tasks
 */

gulp.task('styles', styles);
gulp.task('scripts', scripts);