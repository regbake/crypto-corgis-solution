const gulp = require("gulp");
const nearUtils = require("near-shell/gulp-utils");
const webpack = require('webpack-stream');
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const connect = require('gulp-connect');
const historyApiFallback = require('connect-history-api-fallback');

gulp.task("build", callback => {
  nearUtils.compile("./assembly/main.ts", "./out/main.wasm", callback);
});

exports.default = gulp.series(["build"])

gulp.task("webpack", () => {
  return gulp.src('src/*')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task("serve", (resolve) => {
  connect.server({
    root: 'dist/',
    livereload: true,
    port: 5000,
    middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
  });
  resolve();
});

gulp.task('watch', (resolve) => {
  gulp.watch(['./src/**'], gulp.series('webpack'));
  gulp.watch(['./assembly/**'], gulp.series('build'));
  resolve();
});

gulp.task("run", gulp.parallel("serve", "watch"));

gulp.task("default", gulp.series("build", "webpack"));

// TODO: Extract all following boilerplate into library

// This task is not required when running the project locally. Its purpose is to set up the
// AssemblyScript compiler when a new project has been loaded in WebAssembly Studio.
gulp.task("project:load", () => {
  const utils = require("@wasm/studio-utils");
  utils.eval(utils.project.getFile("setup.js").getData(), {
    logLn,
    project,
    monaco,
    fileTypeForExtension,
  });
});