'use strict';

const mock = require('egg-mock');

describe('test/es-plugin.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/es-plugin-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, esPlugin')
      .expect(200);
  });
});
