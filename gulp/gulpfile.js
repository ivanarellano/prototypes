// test estest
// 
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('uglify', function() {
    gulp.src('*.js')
        .pipe(uglify({preserveComments: 'all'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js'))
});

var watcher = gulp.watch('*.js', ['uglify']);
watcher.on('change', function(e) {
    console.log('File '+e.path+' was '+e.type+', running tasks...');
});