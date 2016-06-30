var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = tsc.createProject('tsconfig.json');
var runSequence = require('run-sequence');
const del = require('del');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');

// --------------
// Configuration.
var PATH = {
    dest: {
        all: 'dist',
        dev: {
            app: 'dist/dev/app',
            all: 'dist/dev',
            lib: 'dist/dev/lib',
            bower: 'dist/dev/bower_components',
            resources: 'dist/dev/resources'
        },
        prod: {
            app: 'dist/prod/app',   
            all: 'dist/prod',
            lib: 'dist/prod/lib',
            bower: 'dist/prod/bower_components',
            resources: 'dist/prod/resources'
        }
    },
    src: {
        // Order is quite important here for the HTML tag injection.
        lib: [
                'node_modules/core-js/client/shim.min.js',
                'node_modules/zone.js/dist/zone.js',
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/@angular/platform-browser-dynamic/index.js'
        ]
    }
};

var filertFile = {
        all: '/**/*',
		allTs: 'app/**/*.ts',
        allHTML: 'app/**/*.html',
        allCSS: 'app/**/*.css',
        allBowerComponents: 'bower_components/**/*.js',
        allResources: 'resources/**/*',
        index: 'index.html'
};

// --------------
// Clean.

// clean the contents of the distribution directory 
gulp.task('clean.all', function () {
  return del(PATH.dest.all);
});
// clean the contents of the distribution directory in dev
gulp.task('clean.dev.all', function () {
  return del(PATH.dest.dev.all);
});
// clean the contents of the distribution directory in dev lib
gulp.task('clean.dev.lib', function () {
  return del(PATH.dest.dev.lib);
});
// clean the contents of the distribution directory in dev app
gulp.task('clean.dev.app', function () {
  return del(PATH.dest.dev.app);
});
// clean the contents of the distribution directory in dev bower
gulp.task('clean.dev.bower', function () {
  return del(PATH.dest.dev.bower);
});
// clean resources dev
gulp.task('clean.dev.resources', function () {
  return del(PATH.dest.dev.resources);
});
// clean assets dev: HTML and CSS
gulp.task('clean.dev.assets', function () {
  return del(PATH.dest.dev.app);
});
// clean assets dev: HTML and CSS
gulp.task('clean.dev.index', function () {
  return del('dist/dev/index.html');
});


// --------------
// Build dev.

// TypeScript compilex
gulp.task('compile.ts.dev', ['clean.dev.app'], function() {
    var sourceTsFiles = [
        filertFile.allTs
    ];

    var tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.dest.dev.app));
});

// copy global resources (css, img, fonts)
gulp.task('build.resources.dev',['clean.dev.resources'], function () {
    return gulp
        .src(filertFile.allResources)
        .pipe(gulp.dest(PATH.dest.dev.resources));
});

// copy dependencies
gulp.task('build.libs.dev', ['clean.dev.lib'], function() {
  return gulp
    .src(PATH.src.lib)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

// copy bower_components
gulp.task('build.bower_components.dev',['clean.dev.bower'], function () {
    return gulp.src(filertFile.allBowerComponents)
        .pipe(gulp.dest(PATH.dist.dev.bower));
});

// copy  assets HTML and CSS 
gulp.task('build.assets.dev', function() {
  return gulp
    .src([filertFile.allHTML, filertFile.allCSS])
    .pipe(gulp.dest(PATH.dest.dev.app));
});

// copy  INDEX
gulp.task('build.index.dev', ['clean.dev.index'], function() {
  return gulp
    .src(filertFile.index)
    .pipe(gulp.dest(PATH.dest.dev.all));
});

// --------------
// Utils.

//Clean Code
gulp.task('ts.lint', function() {
    return gulp.src(filertFile.allTs)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
})

// --------------
// TEST.
// To be implemented.


// --------------
// Serve dev.
gulp.task('default', ['serve.dev']);

gulp.task('serve.dev', runSequence( 'ts.lint',
                        'compile.ts.dev',
                        'build.assets.dev',
                        ['build.resources.dev','build.libs.dev','build.index.dev']
                        ),              
    function() {	
        //cambios en los typescript
        gulp.watch(filertFile.allTs , function(){
            runSequence( 'ts.lint', 'compile.ts.dev');
        });
 
        //cambios en los html y css
        gulp.watch([filertFile.allHTML,filertFile.allCSS, filertFile.index] , function(){
            runSequence( ['build.assets.dev','build.index.dev']);
        });

        serverDev();
    }
);

function serverDev(){
    browserSync({
        port: 3001,
        files: ['index.html', 'app/**/*.js', 'app/**/*.html'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',    
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: ['dist/dev/'],
            middleware: superstatic({ debug: false})
        }
    });	
}