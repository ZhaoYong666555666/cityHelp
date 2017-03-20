var gulp = require("gulp");

//gulp自己的
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;
/*gulp.task('browser-sync',function() {
    browserSync.init({
        server:{
            baseDir:"dist/html/"
        }
    });
});*/


gulp.task("libs",function(){
    gulp.src("src/libs/css/*.css")
    .pipe(gulp.dest("dist/libs/css"));
    gulp.src("src/libs/js/*.js")
    .pipe(gulp.dest("dist/libs/js"));
});



var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var concat = require('gulp-concat');
gulp.task("scss", function() {
    gulp.src(["src/scss/**/*.scss", "!src/scss/**/_*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    // .pipe(reload({stream:true}));
});


var uglify = require("gulp-uglify");
gulp.task("js", function(){
    gulp.src(["src/js/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});


var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
gulp.task("images", function() {
    gulp.src("src/images/**/*.{png,jpg,gif}")
        .pipe(cache(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced: true
        })))
        .pipe(gulp.dest("dist/images"));
});

var htmlmin = require("gulp-htmlmin");
gulp.task("html", function() {
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist/"));
});
 
gulp.task("watch", [/*"browser-sync", */"scss", "js", "images", "html","libs"],function() {    
    gulp.watch("src/scss/**/*.scss", ["scss"]);
    gulp.watch("src/js/**/*.js",["js"]);
    gulp.watch('src/images/**/*.*',["images"]);
    gulp.watch('src/**/*.html',["html"]);
    // gulp.watch("src/**/*.+(html|js)").on("change", reload);
});

gulp.task("default", function() {  
    gulp.start(["scss", "js", "images", "html"/*, "browser-sync"*/, "watch","libs"]);  
});