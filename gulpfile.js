// Load plugins
var gulp = require('gulp'),
	del = require('del'),
	argv = require('yargs').argv,
	plumber = require("gulp-plumber"),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if');


// Define project paths
var projectName = 'chhs-prototype-frontend',	// Used to prefix file names
	paths = {
		source: "src/",
		dist: "dist/",
		staging: "dist-staging/"
	},
	files = {

		// Project javascript files
		js: [
			'App.js',
		],

		// Any assets to copy
		assetsToCopy: [
			'index.html'
		],

		// Bower javascript assets
		bower_js: [
			// jQuery
			// 'jquery/dist/jquery.js',
			// 3rd party libraries
			// Anything you need from bootstrap
			// 'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
		],

		// Bower CSS assets
		bower_css: [
			
		],

	},

	// Server Options
	serverOptions = {
		host: "localhost",
		root: paths.dist,
		port: 8000,
		livereload: true
	},

	// Build environment
	environment = argv.env ? argv.env : 'dev';

// Make changes based on the environment
if(environment)
{
	switch(argv.env)
	{
		// Any other environments here
		// case 'prod':
		// 	serverOptions = {
		// 		host: "",
		// 		root: paths.dist,
		// 		port: 80
		// 	};
		// 	break;
	}
}


//-----------------------------------------
//
//	Clean dist folder
//
//-----------------------------------------
gulp.task('clean', ['clean_css', 'clean_js', 'clean_html', 'clean_images'], function (cb) {
	del([paths.dist + '**/*', '!'+ paths.dist + 'blog/**'], cb);
});

gulp.task('clean_css', function (cb) {
	del([paths.dist + 'css/**/*'], cb);
});

gulp.task('clean_js', function (cb) {
	del([paths.dist + 'js/**/*'], cb);
});

gulp.task('clean_html', function (cb) {
	del([paths.dist + '**/*.html', '!'+ paths.dist + 'blog/**'], cb);
});

gulp.task('clean_images', function (cb) {
	del([paths.dist + 'images/**/*'], cb);
});

gulp.task('clean_fonts', function (cb) {
	del([paths.dist + 'fonts/**/*'], cb);
});

gulp.task('clean_assets', function(cb) {
	var assets = [];
	for(var i = 0, l = files.assetsToCopy.length; i < l; i++) {
		assets.push(paths.dist + files.assetsToCopy[i]);
	}
	del(assets, cb);
});

gulp.task('clean_staging', function(cb) {
	del([paths.staging + '**/*', '!'+ paths.staging + 'blog/**'], cb);
});


//-----------------------------------------
//
//	JS tasks
//
//-----------------------------------------

gulp.task('js_vendor', ['clean_js'], function(){
	return gulp.src(files.bower_js, { cwd: './bower_components/' })
		.pipe(concat(projectName + '.vendor.js'))
		.pipe(gulp.dest('js', { cwd: paths.dist }))
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js', { cwd: paths.dist }));
});


gulp.task('js', ['clean_js', 'js_vendor'], function(){
	return gulp.src(files.js, { cwd: paths.source + 'js' })
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter('default'))
		.pipe(plumber())
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(plumber())
		.pipe(concat(projectName + '.js'))
		.pipe(gulp.dest('js', { cwd: paths.dist }))
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js', { cwd: paths.dist }))
		.pipe(connect.reload());
});


//-----------------------------------------
//
//	CSS tasks
//
//-----------------------------------------

gulp.task('css_vendor', ['clean_css'], function(){
	return gulp.src(files.bower_css, {cwd: './bower_components/'})
		.pipe(concat(projectName + '.vendor.css'))
		.pipe(gulp.dest('css', { cwd: paths.dist }))
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('css', { cwd: paths.dist }));
});

gulp.task('css', ['clean_css', 'css_vendor'], function(){
	return gulp.src(paths.source + 'sass/*.scss')
		.pipe(sass().on('error', console.log))
		.pipe(plumber())
		.pipe(rename(function(path){
			path.extname = '.css';
		}))
		.pipe(gulp.dest('css', { cwd: paths.dist }))
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('css', { cwd: paths.dist }))
		.pipe(connect.reload());
});

//-----------------------------------------
//
//	JADE task
//
//-----------------------------------------

gulp.task('templates', ['clean_html'], function() {
	return gulp.src(paths.source + 'jade/*.jade')
		.pipe(jade({ pretty: true }).on('error', console.log))
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload());
});



//-----------------------------------------
//
// Images
//
//-----------------------------------------
gulp.task('images', ['clean_images'], function() {
	return gulp.src(paths.source + 'images/**/*.*')
		.pipe(gulpif(environment !== 'dev', imagemin()))
		.pipe(gulp.dest('images', { cwd: paths.dist }))
		.pipe(connect.reload());
});



//-----------------------------------------
//
//	Copy Fonts Assets
//
//-----------------------------------------
gulp.task('fonts', ['clean_fonts'], function() {
	return gulp.src(paths.source + "fonts/*")
		.pipe(gulp.dest("fonts", { cwd: paths.dist }))
		.pipe(connect.reload());
});


//-----------------------------------------
//
//	Copy Other Assets
//
//-----------------------------------------
gulp.task('assets', ['clean_assets'], function() {
	return gulp.src(files.assetsToCopy, { cwd: paths.source })
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload());
});



//-----------------------------------------
//
//	Main gulp tasks
//
//-----------------------------------------

// Default Task (Production)
gulp.task('default', ['production'], function() {
	// Done!
});

// Production Task
gulp.task('production', ['build'], function() {
	// Done!
});

// Development Task
gulp.task('build', ['js', 'css', 'assets', 'images', 'fonts'], function() {
	// Done!
});

gulp.task('build_staging', ['clean_staging'], function() {
	gulp.src(paths.dist + '**/*')
		.pipe(gulp.dest(paths.staging));
});

// Serve
gulp.task('serve', ['build'], function() {
	return connect.server(serverOptions);
});

// Serve and watch files for changes
gulp.task('serve-dev', ['build', 'watch'], function() {
	return connect.server(serverOptions);
});

// Staging server for Cisco (only gets builds from qa)
gulp.task('serve-staging', ['build_staging'], function() {
	return connect.server(serverOptions);
});

// Watch files during development
gulp.task('watch', ['build'], function(){
	gulp.watch(paths.source + 'sass/**/*.scss', ['css']);
	gulp.watch(paths.source + 'js/**/*.js', ['js']);
	gulp.watch(paths.source + 'js/**/*.jsx', ['js']);
	gulp.watch(paths.source + 'images/**/*.*', ['images']);
	gulp.watch(paths.source + 'fonts/**/*.*', ['fonts']);
	gulp.watch(paths.source + 'jade/**/*.jade', ['templates']);
	gulp.watch(paths.source + 'jade/**/*.json', ['templates']);
	gulp.watch(paths.source + files.authJson, ['auth']);

	// Assets
	var assets = [];
	for(var i = 0, l = files.assetsToCopy.length; i < l; i++) {
		assets.push(paths.source + files.assetsToCopy[i]);
	}
	gulp.watch(assets, ['assets']);
});
