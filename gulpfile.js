"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require("gulp-clean-css");
const livereload = require("gulp-livereload");

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
        .pipe(livereload())
}

//Task: Kopiera, sammanslå och minifiera js-filer
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("pub/js"))
        .pipe(livereload())
}

//Task: Kopiera, sammanslå och minifiera CSS-filer
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("stylesheet.css"))
        .pipe(cleanCSS())
        .pipe(dest("pub/css"))
        .pipe(livereload())
}

//Task: Kopiera bilder
function copyImages() {
    return src(files.imagePath)
        .pipe(dest("pub/pics"))
}

//Task: Live reload
function liveReload() {
    livereload.listen();
}

//Task: Watcher
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.cssPath], 
        series(
            parallel(
                copyHTML, 
                jsTask, 
                cssTask,
                copyImages),
                liveReload
        )
    );
}

exports.default = series(
    parallel(
        copyHTML, 
        jsTask, 
        cssTask,
        copyImages),
    watchTask
);