/* global hexo */

'use strict';

hexo.theme.config.less = Object.assign({
  paths: []
}, hexo.theme.config.less);

hexo.extend.renderer.register('less', 'css', require('./lib/renderer'));
