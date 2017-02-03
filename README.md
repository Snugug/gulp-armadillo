# Armadillo [![Build Status](https://travis-ci.org/Snugug/gulp-armadillo.svg?branch=master)](https://travis-ci.org/Snugug/gulp-armadillo) [![Coverage Status](https://coveralls.io/repos/github/Snugug/gulp-armadillo/badge.svg?branch=master)](https://coveralls.io/github/Snugug/gulp-armadillo?branch=master) [![npm version](https://badge.fury.io/js/gulp-armadillo.svg)](https://badge.fury.io/js/gulp-armadillo) [![Dependency Status](https://david-dm.org/snugug/gulp-armadillo.svg)](https://david-dm.org/snugug/gulp-armadillo)

[![Greenkeeper badge](https://badges.greenkeeper.io/Snugug/gulp-armadillo.svg)](https://greenkeeper.io/)

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

Be sure to [configure your Armadillo](https://github.com/Snugug/gulp-armadillo/wiki/Configuring-Your-Armadillo) before you get started!

## Basic Armadillo Commands

There are four basic commands that your armadillo knows that you're likely to run:

* `gulp`
* `gulp deploy`

`gulp` is your armadillo's development command. It will run a [BrowserSync](https://www.browsersync.io/) server, watch for changes to all of your files, compile, recompile, and reload everything as you go.

`gulp deploy` is your armadillo's deployment command. It will compile production ready versions of all of your files and inline your [critical](https://www.npmjs.com/package/critical) CSS for you, then deploy the resulting compiled files to [GitHub Pages](https://pages.github.com/). You can run `gulp deploy:dry` to compile production ready versions of your filed without deploying them.
