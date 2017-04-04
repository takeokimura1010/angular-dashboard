"use strict";

module.exports = {
  less: {
    main: "./src/less/main.less",
    watch: [ "src/less/*.less", "src/less/*.css", "src/app/*.less",
      "src/app/**/*.less", "src/app/**/less/*.less"
    ]
  },
  scripts: {
    base: "src/app/",
    main: "./src/app/index.js",
    watch: [ "src/app/*.js", "src/app/**/*.js" ],
    tests: {
      base: "test/app/",
      watch: [ "test/app/*.js", "test/app/**/*.js" ]
    }
  },
  templates: {
    watch: [ "src/app/*.html", "src/app/**/*.html",
      "src/app/**/htmls/*.html", "src/app/**/vistas/*.html"
    ]
  },
  resources: {
    main: [ "src/index.html", "src/resources", "src/resources/*", "src/resources/**/*" ]
  },
  config: {
    main: "./resources/config.js"
  }
};
