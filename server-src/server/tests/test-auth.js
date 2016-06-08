var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe('Authentication', function() {
  it('complains if bad key', function(done) {
    server.get('/api/Cases/11111')
    .set('x-api-key', 'THIS_WONT_WORK')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });

  it('complains if missing auth header', function(done) {
    server.get('/api/Cases/11111')
    .auth('correct', 'credentials')
    .expect(401, done);
  });

});
