'use strict'

// ici se trouve une configuration pour le dev uniquement
// si vous voulez utiliser ce fichier également dans un contexte de production
// il va falloir élargir les capacités
// on pourrai créer une tache 'production' qui ferai les minification etc...

import os from 'os'
import gulp from 'gulp'
import sass from 'gulp-sass'
import open from 'gulp-open'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import livereload from 'gulp-livereload'
import sourcemaps from 'gulp-sourcemaps'

const paths = {
    htmlFiles: [
        './public/**/*.html',       // tout les html dans le dossier public
        '!./public/node_modules/**'  // grace au caractere '!', on dit simplement d'ignorer le dossier ./public/node_modules
    ],
    jsFiles: ['./public/**/*.js', '!./public/node_modules/**'],
    serverJsFiles: ['./server/**/*.js', '!./server/node_modules/**'],
    cssFiles: './public/scss/**/*.scss',
    dest: './dist'
}

const browser = os.platform() === 'linux' ? 'google-chrome' : os.platform() === 'darwin' ?
    'google chrome' : os.platform() === 'win32' ? 'chrome' : 'firefox';

function onInit() {
    livereload.listen()
    gulp.watch(paths.htmlFiles, ['html'])
    gulp.watch(paths.cssFiles, ['sass'])
    gulp.watch(paths.jsFiles, ['babel'])

    // ouvrir directement dans le browser
    gulp.src('./dist/index.html').pipe(open({ uri: 'http://localhost:3434', app: browser }))
}

gulp.task('html', () => {
    gulp.src(paths.htmlFiles)
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload())
})

gulp.task('sass', () => {
    gulp.src(paths.cssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest + '/css'))
        .pipe(livereload())
})

gulp.task('babel', () => {
    gulp.src(paths.jsFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload())
})

gulp.task('server', () => {
    nodemon({
        script: './server/server.js',
        watch: './server'
    })
})

gulp.task('dev', ['html', 'sass', 'babel', 'server'])

// à vous de faire la tache 'prod' qui va uglify, concat, ... tout ce qui optimise la production
// lance la tache 'dev' par défaut

gulp.task('default', ['dev'], onInit)
