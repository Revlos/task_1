var gulp = require("gulp");
// Require the browser-sync
var browserSync = require("browser-sync").create();

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