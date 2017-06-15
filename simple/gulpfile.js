const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload')

gulp.task('sass', function () {
    gulp.src('./public/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload())
})

gulp.task('babel', function () {
    gulp.src('./public/babel/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload())
})

gulp.task('server', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        watch: './server.js'
    })
})

gulp.task('default', ['sass', 'babel', 'server'], function () {
    livereload.listen()

    gulp.watch('./public/scss/*.scss', ['sass'])
})