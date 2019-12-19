'use strict';

const less = require('less');
const { basename, dirname, join } = require('path');
const micromatch = require('micromatch');

module.exports = async function(data) {
  this.theme.config.less = Object.assign({
    paths: []
  }, this.theme.config.less);
  const { route, theme } = this;

  const config = theme.config.less;
  const { options } = config;
  const cwd = process.cwd();
  let { paths } = config;
  const routeList = route.list();

  if (!paths) paths = [];

  paths = micromatch(routeList, paths);
  paths = paths.map(path => join(cwd, dirname(path)));
  paths.push(dirname(data.path));

  const result = await less.render(data.text, {
    paths,
    filename: basename(data.path),
    ...options
  });

  return result.css;
};
