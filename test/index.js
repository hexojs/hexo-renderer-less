'use strict';

require('chai').should();
const r = require('../lib/renderer');

const less = { text: '@foo: 1em; div { bar: @foo; }', path: '/foo/bar.less'};
const css = 'div {\n  bar: 1em;\n}\n';

describe('less', () => {
  it('default', async() => {
    const ctx = {
      theme: {
        config: {}
      }
    };
    const result = await r.call(ctx, less);

    result.should.eql(css);
  });
});
