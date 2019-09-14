"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require("gulp-clean-css");
const imageMin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();


//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    cssPath: "src/**/*.css",
    imagePath: "src/pics/*"
}

//Task: Kopiera HTML-filer
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest("pub"))
        .pipe(browserSync.stream())
}

//Task: Kopiera, sammanslå och minifiera js-filer
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("pub/js"))
        .pipe(browserSync.stream())
}

//Task: Kopiera, sammanslå och minifiera CSS-filer
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("stylesheet.css"))
        .pipe(cleanCSS())
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream())
}

//Task: Kopiera och minifiera bilder
function imageTask() {
    return src(files.imagePath)
        .pipe(imageMin())
        .pipe(dest("pub/pics"))
        .pipe(browserSync.stream())
}

//Task: Watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });

    watch([files.htmlPath, files.jsPath, files.cssPath, files.imagePath], 
        parallel(
            copyHTML, 
            jsTask, 
            cssTask,
            imageTask),
    )
}

exports.default = series(
    parallel(
        copyHTML, 
        jsTask, 
        cssTask,
        imageTask),
    watchTask,
);