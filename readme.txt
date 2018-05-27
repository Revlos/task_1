A. !!! Important:
1. In any conditions, please, do not run unknown node scripts or files, because they can harm your files.
2. This repo include gulpfile.js that can be run thru gulp.
3. This gulpfile.js include usage of the "del" package that use for deleting some files from the "distribution" folder.
4. To run locally this app you need to run "gulp start" - which will run "start" task from this file.
5. !!! So for safety reasons, before run "gulp start", please delete all code from "gulpfile.js" that is below words "For safety delete all what below". This also will delete usage of dangerous package "del".
6. !!! And also check, by yourself, if in such way will be safe to run "start" task that only run local server by "browser-sync".
7. !!! That code, what you need to delete, work correctly and is not harmful, but still for safety not use it until you know what you are doing.

B. To run locally:
1. Run "nmp install".
2. After finishing of the installations, run "gulp start" and look in the terminal for address to check.