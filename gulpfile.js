const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const gcmq = require("gulp-group-css-media-queries");
const mode = require("gulp-mode")();
const browserSync = require("browser-sync");
const crypto = require("crypto");
const hash = crypto.randomBytes(8).toString("hex");
const replace = require("gulp-replace");
const tinypng = require("gulp-tinypng-extended");
const webp = require("gulp-webp");

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

const bundleJs = (done) => {
  webpackStream(webpackConfig, webpack)
    .on("error", function (e) {
      console.error(e);
      this.emit("end");
    })
    .pipe(dest("dist/js"));
  done();
};

const compileSass = (done) => {
  const postcssPlugins = [
    autoprefixer({
      grid: "autoplace",
      cascade: false,
    }),
    cssdeclsort({ order: "alphabetical" }),
  ];
  src("./src/scss/**/*.scss", { sourcemaps: true })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss(postcssPlugins))
    .pipe(mode.production(gcmq()))
    .pipe(dest("./dist/css", { sourcemaps: "./sourcemaps" }));
  done();
};

const buildServer = (done) => {
  browserSync.init({
    port: 8080,
    files: ["**/*"],
    // 下記をLocalのURLに変更
    proxy: "http://gulpforwordpress.local/",
    open: true,
    watchOptions: {
      debounceDelay: 1000,
    },
  });
  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const tinyPng = (done) => {
  src("./src/img/**/*.{png,jpg,jpeg}")
    .pipe(plumber())
    .pipe(
      tinypng({
        key: "YOUR API KEY",
        sigFile: "./src/img/.tinypng-sigs",
        log: true,
        summarise: true,
        sameDest: true,
        parallel: 10,
      })
    )
    .pipe(dest("./src/img"))
    .on("end", done);
};

const copyImages = (done) => {
  src(["./src/img/**/*"]).pipe(dest("./dist/img")).on("end", done);
};

const generateWebp = (done) => {
  src("./dist/img/**/*.{png,jpg,jpeg}", { since: lastRun(generateWebp) })
    .pipe(webp())
    .pipe(dest("dist/img"));
  done();
};

const cacheBusting = (done) => {
  src("./**/**.php")
    .pipe(replace(/\.(webp|jpg|jpeg|png|svg|gif)/g, ".$1?ver=" + hash))
    .pipe(dest("./"));
  done();
};

const watchFiles = () => {
  watch("./src/scss/**/*.scss", series(compileSass, browserReload));
  watch("./src/js/**/*.js", series(bundleJs, browserReload));
  watch("./src/img/**/*", series(copyImages, generateWebp, browserReload));
  watch("./**/*.php", browserReload);
};

module.exports = {
  sass: compileSass,
  bundle: bundleJs,
  tinypng: tinyPng,
  webp: generateWebp,
  image: series(tinyPng, generateWebp, copyImages),
  cache: cacheBusting,
  build: series(
    parallel(compileSass, bundleJs),
    tinyPng,
    copyImages,
    generateWebp,
    cacheBusting
  ),
  default: parallel(buildServer, watchFiles),
};
