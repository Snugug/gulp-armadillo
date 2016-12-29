# Armadillo [![Build Status](https://travis-ci.org/Snugug/gulp-armadillo.svg?branch=master)](https://travis-ci.org/Snugug/gulp-armadillo) [![Coverage Status](https://coveralls.io/repos/github/Snugug/gulp-armadillo/badge.svg?branch=master)](https://coveralls.io/github/Snugug/gulp-armadillo?branch=master) [![npm version](https://badge.fury.io/js/gulp-armadillo.svg)](https://badge.fury.io/js/gulp-armadillo) [![Dependency Status](https://david-dm.org/snugug/gulp-armadillo.svg)](https://david-dm.org/snugug/gulp-armadillo)

```
               ,.-----__
            ,:::://///,:::-.
          /:''/////// ``:::`;/|/     .----.
         /'   ||||||     :://'`\     | Hi |
        .' ,   ||||||     `/(  e \   /----'
  -===~__-'\__X_`````\_____/~`-._ `.
              ~~        ~~       `~-'
```

Armadillo is a cute little thing that drinks from your [Gulp](http://gulpjs.com/) cup and spits out a static site for you! The Armadillo is a little opinionated, so not right for everyone, but it'll get the job done when you need it to.

## Getting Started

Follow our [Developing with the Armadillo](https://github.com/Snugug/gulp-armadillo/wiki/Developing-with-the-Armadillo) instructions to get set up and start working.

Armadillo also provides some [additions to standard rendering](https://github.com/Snugug/gulp-armadillo/wiki/Armadillo-Additions) you may be use to to make your life a little happier when using it.

## Basic Armadillo Commands

There are four basic commands that your armadillo knows that you're likely to run:

* `gulp`
* `gulp build`
* `gulp deploy`

`gulp` is your armadillo's development command. It will run a [BrowserSync](https://www.browsersync.io/) server, watch for changes to all of your files, compile, recompile, and reload everything as you go. By default, everything is compiled and served from the `.www` folder.

`gulp build` is your armadillo's build command. It will compile production ready versions of all of your files and inline your [critical](https://www.npmjs.com/package/critical) CSS for you. By default, everything is compiled in to the `.dist` folder

`gulp deploy` is your armadillo's deployment command. By default, it will run `gulp build` then deploy the resulting compiled files to [GitHub Pages](https://pages.github.com/). Your armadillo will then clean up after itself, removing the `.dist` folder. If you want to deploy somewhere else, the armadillo recommends running `gulp build` then doing what you'd like with the resulting files.
