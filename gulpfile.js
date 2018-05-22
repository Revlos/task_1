var gulp = require("gulp");
// Require the browser-sync
var browserSync = require("browser-sync").create();
var del = require("del");
var fs = require("fs");
var runSequence = require("run-sequence");

// Task to run a server thru browser-sync
gulp.task("start", function() {
  browserSync.init({
    server: {
      baseDir: "production"
    },
    browser: "google chrome",
    open: false
  });
});

/*Working with "distribution" folder:*/

//--Copy some files and folders
gulp.task("dist-fill-copy", function (cb) {
  gulp.src("production/**/*")
  .pipe(gulp.dest("distribution"))
  .on("finish", function() {
    cb();
  });

});

//--Delete some files
gulp.task("dist-fill-delete", function (cb) {

  del.sync(["*/*/", "!*/dist/"], {cwd: "distribution/bower_components", force: true});
  cb();
});

//-Fill in dist folder
gulp.task("dist-fill", function (cb) {
  runSequence("dist-fill-copy", "dist-fill-delete", cb);
});

//-Empty dist folder
gulp.task("dist-empty", function () {
  //Delete all files
  del.sync(["*"], {cwd: "distribution", force: true});
});