# [Less] renderer

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-less.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-less)
[![NPM version](https://badge.fury.io/js/hexo-renderer-less.svg)](https://www.npmjs.com/package/hexo-renderer-less)

Add support for [Less].

## Install

``` bash
$ npm install hexo-renderer-less --save
```

## Configure

You can specify a [less include paths](http://lesscss.org/usage/#less-options-include-paths) as an array config in your theme configuration.

```yaml
// themes/yourtheme/_config.yml

less:
  paths:
    - bower_components/bootstrap/less
```

You can compress the output of the css with a config in your theme configuration.

```yaml
// themes/yourtheme/_config.yml

less:
  compress: true
```

[Less]: http://lesscss.org/
