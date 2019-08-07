/* global hexo */
'use strict';

const less = require('less');
const path = require('path');

hexo.extend.renderer.register('less', 'css', (data, options, callback) => {
  const themeConfig = hexo.theme.config.less || {};
  const cwd = process.cwd();
  const paths = (themeConfig.paths || []).map(filepath => {
    return path.join(cwd, filepath); // assuming paths are relative from the root of the project
  });

  const parser = less.render(data.text, {
    paths: paths.concat(path.dirname(data.path)),
    filename: path.basename(data.path),
    compress: themeConfig.compress || false
  })
    .then(output => {
      callback(null, output.css);
    },
    error => {
      callback(error);
    });
});
