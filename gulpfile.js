/* eslint-disable */
// Dependencies ----------------------------------------------------------------------- >
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass')(require('sass'));
var minifyJS = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var rollup = require('gulp-better-rollup');
var rollupPluginRe = require('rollup-plugin-replace');
var rollupNodeResolve = require('rollup-plugin-node-resolve');
var rollupCommonJs = require('rollup-plugin-commonjs');
var rollupBabel = require('rollup-plugin-babel');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var confirm = require('gulp-confirm');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var sftp = require('gulp-sftp-up4');
var scan = require('gulp-scan');
var argv = require('yargs').argv;
var chalk = require('chalk');
var replace = require('gulp-replace');
var stripComments = require('gulp-strip-comments');
var beautify = require('gulp-cssbeautify');
var clean = require('gulp-rimraf');
var connect = require('gulp-connect');
var cors = require('cors');
// Arguments ------------------------------------------------------------------------- >
var currentFolder = argv.foldername || argv.fn || '';
var clientName = argv.clientname || argv.cn || '';
var sourceExperimentFolder = argv.sourcefoldername || argv.sfn || '';
var sourceExperimentClientName = argv.sourceclientname || argv.scn || '';
var port = argv.port || 3000;
// Options --------------------------------------------------------------------------- >
var userVariation = argv.variation; // Variation specified
var userId = argv.id || currentFolder; // Variation specified
var old = argv.old ? true : false; // Backwards compatibility for old directory structure
var lint = argv.lint ? true : false; // Enable linting
var keepComments = argv.keepComments ? true : false; // Retain comments in unminifed transpiled code
var notifyOn = argv.notify ? true : false;
var customTemplate = argv.customtemplate;
var liveCode = argv.livecode ? true : false;

// Modify the custom template based on client name
if (!customTemplate) {
  if (clientName == 'Flannels' || clientName == 'SportsDirect' || clientName == 'HouseOfFraser') {
    customTemplate = 'frasers';
  }
  if (userId.match(/^AG/) || userId.match(/^AZ/)) {
    customTemplate = 'avon';
  }
  if (userId.match(/^SG/)) {
    customTemplate = 'signet';
  }
  if (userId.match(/^TP/)) {
    customTemplate = 'travisperkins';
  }
  if (userId.match(/^HC/)) {
    customTemplate = 'hotelchocolat';
  }
  if (clientName == 'Boots') {
    customTemplate = 'boots';
  }
  if (clientName == 'Biscuiteers') {
    customTemplate = 'biscuiteers';
  }
  if (clientName == 'Screwfix') {
    customTemplate = 'screwfix';
  }
  if (clientName == 'Homeserve') {
    customTemplate = 'homeserve';
  }
  if (clientName == 'Travelodge') {
    customTemplate = 'Travelodge';
  }
}

// Directories ----------------------------------------------------------------------- >
// Local
var dir = './clients/' + clientName + '/' + currentFolder;
var src = old ? '' : '/src';
var srcAllSassLocation = dir + src + '/**/*.scss';
var srcJsLocation = dir + src + '/*.js';
var imagesLocation = dir + src + '/images/*.*';
var outputFolder = dir + '/dist/';
var outputFiles = dir + '/dist/' + '*';
var localFilesGlob = [outputFiles];

// Server
var remotePath = 'httpdocs/experiments';

// Tasks ----------------------------------------------------------------------------- >
// SASS - [Compile, Autoprefix, Rename, Minify]
gulp.task('sass', function () {
  return gulp
    .src(srcAllSassLocation)
    .pipe(replace(/--VARIATION--/, userVariation || 1))
    .pipe(replace(/--ID--/, userId || ''))
    .pipe(
      sass({
        includePaths: ['./node_modules/compass-mixins/lib'],
        includePaths: ['node_modules'],
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 4 versions', 'not ie < 80'],
        remove: false,
      })
    )
    .pipe(beautify())
    .pipe(replace('--ID--', userId || '')) // Required again for when we use @import directive
    .pipe(concat(currentFolder + '.css'))
    .pipe(gulp.dest(outputFolder))
    .pipe(gulp.dest('./server-dist'))
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      })
    )
    .pipe(rename(currentFolder + '.min.css'))
    .pipe(gulp.dest(outputFolder + '/min'));
});

// JS - [Lint, Concatenate, Rename, Minify]
gulp.task('scripts', function () {
  return gulp
    .src(srcJsLocation)
    .pipe(gulpif(lint, eslint()))
    .pipe(gulpif(lint, eslint.format()))
    .pipe(gulpif(lint, eslint.failAfterError()))
    .pipe(
      rollup(
        {
          plugins: [
            rollupPluginRe({
              VARIATION: userVariation || 1,
              ID: userId || '',
              CLIENT: clientName || '',
              LIVECODE: liveCode || '',
              delimiters: ['{{', '}}'],
            }),
            rollupNodeResolve({
              mainFields: ['main', 'jsnext'],
            }),
            rollupCommonJs({
              include: /node_modules/,
            }),
            rollupBabel({
              presets: [['@babel/preset-env']],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
                [
                  'module-resolver',
                  {
                    root: ['.'],
                    alias: {
                      react: 'preact/compat',
                      'react-dom/test-utils': 'preact/test-utils',
                      'react-dom': 'preact/compat',
                      'react/jsx-runtime': 'preact/jsx-runtime',
                    },
                  },
                ],
                // ['babel-plugin-jsx-pragmatic', {
                //   module: 'preact',
                // }],
              ],
            }),
          ],
        },
        {
          format: 'cjs',
        }
      )
    )
    .on('error', function (error) {
      // Show error
      // @todo Lint against all JS files
      console.error(error);
    })
    .pipe(wrap('(function() {\n<%= contents %>\n})();'))
    .pipe(rename(currentFolder + '.js'))
    .pipe(gulpif(!keepComments, stripComments()))
    .pipe(gulp.dest(outputFolder))
    .pipe(gulp.dest('./server-dist'))
    .pipe(
      minifyJS({
        ext: {
          min: '.min.js',
        },
        noSource: true,
        exclude: ['dist/min'],
        ignoreFiles: ['.combo.js', '-min.js', '.min.js'],
      })
    )
    .pipe(
      scan({
        term: 'alert',
        fn: function (match, file) {
          console.log('=================================================================');
          console.log('===============!!! ALERT FOUND IN FILE, REMOVE ==================');
          console.log('=================================================================');
        },
      })
    )
    .pipe(gulp.dest(outputFolder + '/min'));
});

// Images - [Rename]
gulp.task('images', function () {
  return gulp
    .src(imagesLocation)
    .pipe(
      rename({
        prefix: currentFolder + '-',
      })
    )
    .pipe(gulp.dest(outputFolder));
});

// Deploy files to UC server
gulp.task(
  'ftp-deploy',
  gulp.series(function () {
    var t = gulp
      .src(localFilesGlob)
      .pipe(
        sftp({
          host: '139.162.250.142',
          user: 'abtestuc',
          pass: 'hzSygx29Gvnq',
          remotePath: remotePath,
        })
      )
      .pipe(
        gulpif(
          notifyOn,
          notify({
            message: 'New files deployed',
            onLast: true,
          })
        )
      );

    return t;
  })
);

// Create new experiment from template files
gulp.task('experiment-create', function () {
  var newExperimentName = currentFolder;
  var newClientName = clientName;
  var newExperimentFolder = './clients/' + clientName + '/' + newExperimentName;
  var fs = require('fs');

  if (fs.existsSync(newExperimentFolder)) {
    console.log(
      chalk.bgRed.white.bold(
        'This experiment already exists. If you create this experiment you will overwrite the existing folder.'
      )
    );
  }

  let templatePath = './templates/core/**/*';
  if (customTemplate) {
    templatePath = `./templates_custom/${customTemplate}/**/*`;
  }

  return (
    gulp
      .src([templatePath])
      .pipe(
        confirm({
          question:
            'You are creating a new experiment (' +
            newExperimentName +
            ' for ' +
            newClientName +
            '). This will overwrite any existing files with the same names. Do you want to proceed? [y/n]',
          proceed: function (answer) {
            var toLowerCase = answer.toLowerCase();
            if (answer === 'y' || answer === 'yes') {
              return true;
            } else {
              return false;
            }
          },
        })
      )
      .pipe(
        notify({
          message: 'Experiment ' + newExperimentName + ' successfully created',
          onLast: true,
        })
      )
      // .pipe(rename({
      //     basename: 'experiment'
      // }))
      .pipe(gulp.dest(newExperimentFolder + '/src'))
  );
});

gulp.task('clean', function () {
  var fs = require('fs');
  console.log('Cleaning all files in dist folder');
  return gulp.src(dir + '/dist/**/', { read: true }).pipe(clean());
});
gulp.task('clean-server', function () {
  var fs = require('fs');
  console.log('Cleaning all files in server-dist folder');
  return gulp.src('./server-dist/*', { read: true }).pipe(clean());
});

gulp.task('server', async function () {
  connect.server({
    root: dir + '/dist',
    host: 'localhost',
    port: port,
    middleware: function () {
      return [cors()];
    },
  });
  connect.serverClose();
});

gulp.task('run-server', async function () {
  connect.server({
    root: './server-dist',
    host: 'localhost',
    port: port,
    middleware: function () {
      return [cors()];
    },
  });
  connect.serverClose();
});

// Create new experiment from template files
gulp.task('experiment-duplicate', function () {
  var newExperimentName = currentFolder;
  var newClientName = clientName;
  var newExperimentFolder = './clients/' + clientName + '/' + newExperimentName;
  var fs = require('fs');

  // if (fs.existsSync(newExperimentFolder)) {
  //   console.log(chalk.bgRed.white.bold('This experiment already exists. If you create this experiment you will overwrite the existing folder.'));
  // }

  let templatePath = './clients/' + sourceExperimentClientName + '/' + sourceExperimentFolder + '/src/**/*';
  console.log(templatePath);
  return gulp
    .src([templatePath])
    .pipe(replace(sourceExperimentFolder, newExperimentName))
    .pipe(
      notify({
        message: 'Experiment ' + newExperimentName + ' successfully duplicated',
        onLast: true,
      })
    )
    .pipe(gulp.dest(newExperimentFolder + '/src'));
});

// Default task
gulp.task(
  'default',
  gulp.series(
    'server',
    'clean',
    'sass',
    'scripts',
    'images',
    //"ftp-deploy",
    function () {
      notify({
        message: 'Watching /src for changes',
      });

      var watcher = gulp.watch(dir + src);
      watcher.on(
        'change',
        gulp.series(
          'clean',
          'scripts',
          'sass',
          'images',
          // "ftp-deploy",
          function () {
            console.log('[watcher] File was modified, compiling...');
          }
        )
      );
    }
  )
);
