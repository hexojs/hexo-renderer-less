'use strict';

const less = require('less');
const { basename, dirname, join} = require('path');

module.exports = async function(data) {
  this.theme.config.less = Object.assign({
    paths: []
  }, this.theme.config.less);

  const config = this.theme.config.less;
  const { options } = config;
  const cwd = process.cwd();
  const paths = config.paths.map(filepath => {
    return join(cwd, filepath); // assuming paths are relative from the root of the project
  });

  const result = await less.render(data.text, {
    paths: paths.concat(dirname(data.path)),
    filename: basename(data.path),
    ...options
  });

  return result.css;
};
