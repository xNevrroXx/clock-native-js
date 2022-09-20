const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");
const rename = require("gulp-rename");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const dist = "./dist";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});
gulp.task("copy-json", () => { 
    return gulp.src("./src/js/*.json")
                .pipe(gulp.dest(dist + "/js"))
                .pipe(browsersync.stream());
});
// gulp.task("copy-js", () => {
//   return gulp.src("./src/js/**/*.js")
//                 .pipe(gulp.dest(dist + "/js"))
//                 .pipe(browsersync.stream());
// });

gulp.task("build-js", () => {
    return gulp.src("./src/builtJS/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'bundle.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + '/js'))
                .pipe(browsersync.stream());
});

gulp.task("build-ts", () => {
  return tsProject.src()
    .pipe(tsProject()).js
    .pipe(gulp.dest("./src/builtJS"));
});

gulp.task("build-sass", () => {
    return gulp.src("./src/scss/**/*.@(scss|sass)")
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(dist + '/css'))
                .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    gulp.src("./src/icons/**/*.*")
        .pipe(gulp.dest(dist + "/icons"));

    return gulp.src("./src/img/**/*.*")
                .pipe(gulp.dest(dist + "/img"))
                .pipe(browsersync.stream());
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/scss/**/*.@(scss|sass)", gulp.parallel("build-sass"));
    gulp.watch("./src/builtJS/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/ts/**/*.ts", gulp.parallel("build-ts"));
    gulp.watch("./src/js/*.json", gulp.parallel("copy-json"));
});

gulp.task("build",
    gulp.series(
        gulp.parallel("copy-html", "copy-assets", "build-sass", "build-ts", "build-js", "copy-html", "copy-json"),
    )
);

gulp.task("prod", () => {
    gulp.src("./src/index.html")
        .pipe(gulp.dest(dist));
    gulp.src("./src/img/**/*.*")
        .pipe(gulp.dest(dist + "/img"));
    gulp.src("./src/icons/**/*.*")
        .pipe(gulp.dest(dist + "/icons"));

    gulp.src("./src/js/main.ts")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [['@babel/preset-env', {
                            debug: false,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                      }
                    }
                  }
                ]
              }
        }))
        .pipe(gulp.dest(dist + '/js'));
    
    return gulp.src("./src/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dist + '/css'));
});

gulp.task("default", gulp.parallel("watch", "build"));