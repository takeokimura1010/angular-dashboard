"use strict";
var gulp = require( "gulp" );

gulp.task( "generateModule", require( "./moduleGenerator.js" ) );
gulp.task( "generateCrud", require( "./crudGenerator.js" ) );
