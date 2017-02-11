let {refreshMongo} = require('../mongoTool');

beforeEach((done) => {
  refreshMongo(done);
});