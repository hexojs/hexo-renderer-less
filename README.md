# [Less] renderer

[![Build Status](https://travis-ci.com/hexojs/hexo-renderer-less.svg?branch=master)](https://travis-ci.com/hexojs/hexo-renderer-less)
[![NPM version](https://badge.fury.io/js/hexo-renderer-less.svg)](https://www.npmjs.com/package/hexo-renderer-less)

Add support for [Less].

## Install

``` bash
$ npm install hexo-renderer-less --save
```

## Configure

In your theme configuration,

```yaml
// themes/yourtheme/_config.yml

less:
  paths: []
```

- **paths**: Array of [include paths](http://lesscss.org/usage/#less-options-include-paths).
  * e.g. to include Bower Bootstrap, `['bower_components/bootstrap/less']`

[Less]: http://lesscss.org/
