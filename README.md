# Armadillo

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
* `gulp dist`
* `gulp deploy`
* `gulp create-config`

`gulp` is your armadillo's development command. It will run a [Browsersync](https://www.browsersync.io/) server, watch for changes to all of your files, compile, recompile, and reload everything as you go. By default, everything is compiled and served from the `.www` folder.

`gulp dist` is your armadillo's distribution command. It will compile production ready versions of all of your files and inline your [critical](https://www.npmjs.com/package/critical) CSS for you. Armadillo supports [useref](https://www.npmjs.com/package/useref) to automatically concatenate and minify just the files you need for production, so it likes when use it. By default, everything is compiled in to the `.dist` folder

`gulp deploy` is your armadillo's deployment command. It will run `gulp dist` then deploy the resulting compiled files to [GitHub Pages](https://pages.github.com/). Your armadillo will then clean up after itself, removing the `.dist` folder. If you want to deploy somewhere else, the armadillo recommends running `gulp dist` then doing what you'd like with the resulting files.

`gulp create-config` is your armadillo's configuration command. It will generate and then open a `.armadillo.js` file that is a direct copy the default armadillo configuration. It will include `require` statements that will need to be resolved to have everything work. Read up on [Configuring Your Armadillo](https://github.com/Snugug/gulp-armadillo/wiki/Configuring-Your-Armadillo) for full configuration instructions.