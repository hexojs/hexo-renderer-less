'use strict';

require('chai').should();
const { join } = require('path');


describe('less', () => {
  const defaultCfg = {
    theme: {
      config: {
        less: {
          paths: []
        }
      }
    }
  };
  const ctx = JSON.parse(JSON.stringify(defaultCfg));
  const r = require('../lib/renderer').bind(ctx);
  const expected = 'div {\n  bar: 1em;\n}\n';

  beforeEach(() => {
    ctx.theme.config = JSON.parse(JSON.stringify(defaultCfg.theme.config));
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
    ctx.theme.config.less.paths = ['test/fixtures/'];

    const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('custom options', async () => {
    ctx.theme.config.less.options = {
      globalVars: {
        foo: '1em'
      }
    };

    const less = { text: 'div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });
});
