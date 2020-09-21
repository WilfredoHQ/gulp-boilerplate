import autoprefixer from "gulp-autoprefixer";
import babelify from "babelify";
import browserify from "browserify";
import browserSync from "browser-sync";
import buffer from "vinyl-buffer";
import cachebust from "gulp-cache-bust";
import cssnano from "gulp-cssnano";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import minify from "gulp-minify";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import rename from "gulp-rename";
import sass from "gulp-sass";
import sitemap from "gulp-sitemap";
import source from "vinyl-source-stream";
import sourcemaps from "gulp-sourcemaps";
import tildeImporter from "node-sass-tilde-importer";
import watch from "gulp-watch";

const server = browserSync.create();

const startServer = () => {
  server.init({
    server: {
      baseDir: "./public",
    },
  });
};

const stylesDev = () =>
  gulp
    .src("./src/scss/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        importer: tildeImporter,
        sourceComments: true,
        outputStyle: "expanded",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: "> 1%, last 2 versions, Firefox ESR, Opera 12.1",
        cascade: false,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(server.stream({ match: "**/*.css" }));

const stylesBuild = () =>
  gulp
    .src("./src/scss/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        importer: tildeImporter,
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: "> 1%, last 2 versions, Firefox ESR, Opera 12.1",
        cascade: false,
      })
    )
    .pipe(
      cssnano({
        autoprefixer: {
          remove: false,
        },
      })
    )
    .pipe(rename("styles.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(server.stream({ match: "**/*.css" }));

const pugDev = () =>
  gulp
    .src("./src/pug/pages/**/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
        basedir: "./src/pug",
      })
    )
    .pipe(gulp.dest("./public"));

const pugBuild = () =>
  gulp
    .src("./src/pug/pages/**/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        basedir: "./src/pug",
      })
    )
    .pipe(gulp.dest("./public"));

const scriptsDev = () =>
  browserify("./src/js/index.js")
    .transform(babelify, {
      global: true, // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on("error", function (err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("scripts.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/assets/js"));

const scriptsBuild = () =>
  browserify("./src/js/index.js")
    .transform(babelify, {
      global: true, // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on("error", function (err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("scripts.js"))
    .pipe(buffer())
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: "-min.js",
        },
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/assets/js"));

const imagesDev = () =>
  gulp.src("./src/img/**/**").pipe(gulp.dest("./public/assets/img"));

const imagesBuild = () =>
  gulp
    .src("./src/img/**/**")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("./public/assets/img"));

const watchFiles = () => {
  watch("./src/scss/**/**", gulp.series(stylesDev));
  watch("./src/pug/**/**", gulp.series(pugDev, server.reload));
  watch("./src/md/**/**", gulp.series(pugDev, server.reload));
  watch("./src/js/**/**", gulp.series(scriptsDev, server.reload));
  watch("./src/img/**/**", gulp.series(imagesDev));
};

const cache = () =>
  gulp
    .src("./public/**/*.html")
    .pipe(
      cachebust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest("./public"));

const siteMap = () =>
  gulp
    .src("./public/**/*.html", {
      read: false,
    })
    .pipe(
      sitemap({
        siteUrl: "https://example.com", // remplazar por tu dominio
      })
    )
    .pipe(gulp.dest("./public"));

export const dev = gulp.parallel(
  startServer,
  gulp.series([stylesDev, pugDev, scriptsDev, imagesDev, watchFiles])
);

export const build = gulp.parallel([
  stylesBuild,
  pugBuild,
  scriptsBuild,
  imagesBuild,
  cache,
  siteMap,
]);
