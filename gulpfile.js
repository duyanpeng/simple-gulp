/**
 * 在55行可以配置代理
 */
var gulp = require("gulp");
var less = require("gulp-less");
var auto = require("gulp-autoprefixer");
var connect = require('gulp-connect');
var clean = require('gulp-clean-fix');
var proxy = require('http-proxy-middleware')
var path = require('path')
var shelljs = require('shelljs')

//  修改less
gulp.task("compileLess", function () {
    gulp.src("src/css/**/*.less")
        .pipe(less())
        .pipe(auto({
            grid: true,
            browsers: ['last 2 version', "iOS >= 7", "Android >= 4"]
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})

//  修改css
gulp.task("compileCss", function () {
    gulp.src("src/css/**/*.css")
        .pipe(auto({
            grid: true,
            browsers: ['last 2 version', "iOS >= 7", "Android >= 4"]
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})

//修改html页面
gulp.task('compileHtml', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

//修改js
gulp.task('compileJs', () => {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('server', () => {
    connect.server({
        root: [path.join(__dirname, './dist')],
        port: 9999,
        host: '0.0.0.0',
        livereload: true,
        middleware: function (connect, opt) {
            return [
                // 配置代理在这里！
                proxy('/proxy', {
                    target: 'http://localhost:8081',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/proxy': ''
                    }
                }),
            ]
        }
    })
});

gulp.task('copyImage', function () {
    shelljs.exec(`cp -a src/image  dist/`)
});

gulp.task('copy', function () {
    shelljs.exec("rm -rf dist");
    shelljs.exec(`mkdir -p dist  && cp -a src/image  dist/ && cp -a src/libs  dist/`)
});

gulp.task("watch", function () {
    gulp.watch('src/css/**/*.less', ['compileLess']);
    gulp.watch('src/css/**/*.css', ['compileCss']);
    gulp.watch('src/js/**/*.js', ['compileJs']);
    gulp.watch('src/**/*.html', ['compileHtml']);
    gulp.watch('src/image/**', ['copyImage']);
})

gulp.task("default", ['copy', 'compileHtml', 'compileJs', 'compileCss', 'compileLess', 'server', "watch"]);
gulp.task("start", ['server', "watch"]);