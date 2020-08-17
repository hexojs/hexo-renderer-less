'use strict';

require('chai').should();
const { join } = require('path');
const Hexo = require('hexo');

describe('less', () => {
  const hexo = new Hexo(__dirname, { silent: true });
  const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.theme.config, {
    less: {
      paths: []
    }
  })));
  const r = require('../lib/renderer').bind(hexo);
  const expected = 'div {\n  bar: 1em;\n}\n';

  beforeEach(() => {
    hexo.theme.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  it('default', async () => {
    const less = { text: '@foo: 1em; div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('import variable - same folder', async () => {
    const filepath = join(__dirname, 'fixtures/foo.less');
    const less = { text: '@import "variables.less"; div { bar: @foo; }', path: filepath};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('import variable - different folder', async () => {
    hexo.theme.config.less.paths = ['test/fixtures/'];

    const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('custom options', async () => {
    hexo.theme.config.less.options = {
      globalVars: {
        foo: '1em'
      }
    };

    const less = { text: 'div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });

  describe('globbing', () => {
    const extFile = 'test/fixtures/variables.less';

    beforeEach(() => {
      hexo.route.set(extFile, '@foo: 1em;');
    });

    afterEach(() => {
      hexo.route.remove(extFile);
    });

    it('paths - string', async () => {
      hexo.theme.config.less.paths = extFile;
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - array', async () => {
      hexo.theme.config.less.paths = [extFile];
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - globbing (array)', async () => {
      hexo.theme.config.less.paths = ['**/test/fixtures/*'];
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - globbing (string)', async () => {
      hexo.theme.config.less.paths = '**/test/fixtures/*';
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - string + globbing', async () => {
      hexo.theme.config.less.paths = ['a/path/', '**/test/fixtures/*'];
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - globbing + string', async () => {
      hexo.theme.config.less.paths = [extFile, '**/sky/*'];
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
      const result = await r(less);

      result.should.eql(expected);
    });

    it('paths - globbing not matched', async () => {
      hexo.theme.config.less.paths = '**/sky/*';
      const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};

      try {
        await r(less);
      } catch (err) {
        err.message.includes('\'variables.less\' wasn\'t found.').should.eql(true);
      }
    });
  });
});
