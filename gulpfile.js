'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package');
var scripts = {
      name: 'cropper.js',
      min: 'cropper.min.js',
      all: [
        'gulpfile.js',
        'dist/cropper.js',
        'demo/js/main.js',
        'docs/js/main.js',
        'test/**/*.js'
      ],
      list: [
        'src/js/intro.js',
        'src/js/variables.js',
        'src/js/utilities.js',
        'src/js/cropper.js',
        'src/js/load.js',
        'src/js/build.js',
        'src/js/render.js',
        'src/js/preview.js',
        'src/js/bind.js',
        'src/js/handlers.js',
        'src/js/change.js',
        'src/js/methods.js',
        'src/js/prototype.js',
        'src/js/defaults.js',
        'src/js/template.js',
        'src/js/statics.js',
        'src/js/outro.js'
      ],
      main: 'dist/cropper.js',
      site: '_gh_pages/js',
      src: 'src/*.js',
      dest: 'dist'
    };
var styles = {
      name: 'cropper.css',
      min: 'cropper.min.css',
      all: [
        'dist/cropper.css',
        'demo/css/main.css',
        'docs/css/main.css'
      ],
      scss: 'src/scss/*.scss',
      main: 'dist/cropper.css',
      site: '_gh_pages/css',
      src: 'src/scss/*.scss',
      dest: 'dist'
    };
var replacement = {
      regexp: /@\w+/g,
      filter: function (placeholder) {
        switch (placeholder) {
          case '@VERSION':
            placeholder = pkg.version;
            break;

          case '@YEAR':
            placeholder = (new Date()).getFullYear();
            break;

          case '@DATE':
            placeholder = (new Date()).toISOString();
            break;
        }

        return placeholder;
      }
    };

gulp.task('js+', function () {
  return gulp.src(scripts.list)
    .pipe(plugins.concat(scripts.name))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('jshint', ['js+'], function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('jscs', ['js+'], function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('js', ['jshint', 'jscs'], function () {
  return gulp.src(scripts.main)
    .pipe(plugins.replace(replacement.regexp, replacement.filter))
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.rename(scripts.min))
    .pipe(plugins.uglify({
        preserveComments: 'license'
      }))
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.site));
});

gulp.task('concat', function () {
  return gulp.src(scripts.list)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat(scripts.name))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('css+', function () {
  return gulp.src(styles.src)
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('csslint', ['css+'], function () {
  return gulp.src(styles.all)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter());
});

gulp.task('css', ['csslint'], function () {
  return gulp.src(styles.main)
    .pipe(plugins.replace(replacement.regexp, replacement.filter))
    .pipe(plugins.autoprefixer({
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      }))
    .pipe(gulp.dest(styles.dest))
    .pipe(plugins.rename(styles.min))
    .pipe(plugins.minifyCss({
        compatibility: 'ie8',
        keepSpecialComments: 1
      }))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(styles.site));
});

gulp.task('sass', function () {
  return gulp.src(styles.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('htmlcomb:demo', function () {
  return gulp.src('demo/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('demo'));
});

gulp.task('htmlcomb:docs', function () {
  return gulp.src('docs/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('docs'));
});

gulp.task('htmlcomb:examples', function () {
  return gulp.src('examples/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('examples'));
});

gulp.task('htmlcomb', ['htmlcomb:demo', 'htmlcomb:docs', 'htmlcomb:examples']);

gulp.task('assets:js', function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/qunit/qunit/qunit.js'
    ])
    .pipe(gulp.dest('assets/js'));
});

gulp.task('assets:fonts', function () {
  return gulp.src([
      'bower_components/bootstrap/fonts/*',
      'bower_components/fontawesome/fonts/*'
    ])
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('assets:css', ['assets:fonts'], function () {
  return gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/fontawesome/css/font-awesome.min.css',
      'bower_components/qunit/qunit/qunit.css'
    ])
    .pipe(gulp.dest('assets/css'));
});

gulp.task('assets', ['assets:js', 'assets:css']);

gulp.task('docs:img', function () {
  return gulp.src('assets/img/*')
    .pipe(gulp.dest('_gh_pages/img'));
});

gulp.task('docs:all', function () {
  return gulp.src('docs/**')
    .pipe(gulp.dest('_gh_pages'));
});

gulp.task('docs', ['docs:img', 'docs:all']);

gulp.task('release', ['js', 'css', 'docs'], function () {
  return gulp.src('dist/*.{js,css}')
    .pipe(gulp.dest('_releases/' + pkg.version));
});

gulp.task('watch', function () {
  gulp.watch(scripts.list, ['concat']);
  gulp.watch(styles.scss, ['sass']);
  gulp.watch('docs/**', ['docs:all']);
});

gulp.task('default', ['watch']);
