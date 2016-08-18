const gulp = require('gulp');
const webpack = require('webpack-stream');
const plugins = require('gulp-load-plugins')();
const pkg = require('./package');
const now = new Date();
const scripts = {
  docs: 'docs/js',
  dest: 'dist',
  entry: 'src/js/cropper.js',
  output: 'dist/cropper.js',
  src: 'src/js/*.js',
};
const styles = {
  docs: 'docs/css',
  dest: 'dist',
  entry: 'src/less/cropper.less',
  output: 'dist/cropper.css',
  src: 'src/less/*.less',
};
const banner = `/*!
 * Cropper.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2015-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`;

gulp.task('eslint', () => {
  return gulp.src(scripts.src)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task('webpack', () => {
  return gulp.src(scripts.entry)
    .pipe(webpack({
      output: {
        filename: 'cropper.js',
        // library: 'Cropper',
        libraryTarget: 'umd',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
        ],
      },
      devtool: 'source-map',
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('js', ['eslint', 'webpack'], () => {
  return gulp.src(scripts.output)
    .pipe(plugins.banner(banner))
    .pipe(gulp.dest(scripts.docs))
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.banner(banner))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('less', () => {
  return gulp.src(styles.entry)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('css', ['less'], () => {
  return gulp.src(styles.output)
    .pipe(plugins.autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12',
      ],
    }))
    .pipe(plugins.banner(banner))
    .pipe(gulp.dest(styles.docs))
    .pipe(gulp.dest(styles.dest))
    .pipe(plugins.cleanCss({
      keepSpecialComments: 0,
    }))
    .pipe(plugins.banner(banner))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('test', ['js', 'css'], () => {
  return gulp.src('test/*.html')
    .pipe(plugins.qunit());
});

gulp.task('docs', () => {
  return gulp.src('assets/images/**')
    .pipe(gulp.dest('docs/images'));
});

gulp.task('site', ['docs'], () => {
  return gulp.src('docs/**')
    .pipe(gulp.dest('site'));
});

gulp.task('assets:js', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/tether/dist/js/tether.min.js',
  ])
    .pipe(gulp.dest('assets/js'));
});

gulp.task('assets:fonts', () => {
  return gulp.src([
    'node_modules/bootstrap/fonts/*',
    'node_modules/font-awesome/fonts/*',
  ])
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('assets:css', ['assets:fonts'], () => {
  return gulp.src([
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/tether/dist/css/tether.min.css',
  ])
    .pipe(gulp.dest('assets/css'));
});

gulp.task('assets', ['assets:js', 'assets:css']);

gulp.task('release', ['test', 'site']);

gulp.task('watch', () => {
  gulp.watch(scripts.src, ['webpack']);
  gulp.watch(styles.src, ['less']);
});

gulp.task('default', ['watch']);
