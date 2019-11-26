'use strict';

require('chai').should();
const { join } = require('path');
const ctx = {
  theme: {
    config: {}
  }
};
const r = require('../lib/renderer').bind(ctx);

describe('less', () => {
  const expected = 'div {\n  bar: 1em;\n}\n';

  it('default', async() => {
    const less = { text: '@foo: 1em; div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('import variable - same folder', async() => {
    const filepath = join(process.cwd(), 'test/fixtures/foo.less');
    const less = { text: '@import "variables.less"; div { bar: @foo; }', path: filepath};
    const result = await r(less);

    result.should.eql(expected);
  });

  it('import variable - different folder', async() => {
    ctx.theme.config.less.paths = ['test/fixtures/'];
    const less = { text: '@import "variables.less"; div { bar: @foo; }', path: '/foo/bar.less'};
    const result = await r(less);

    result.should.eql(expected);

    ctx.theme.config.less.paths = [];
  });
});
