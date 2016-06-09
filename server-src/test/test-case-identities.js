var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var server = supertest.agent("http://localhost:3000");

/*
 * Basic "are we up" tests. Still needs create/update/delete tests, and
 * rinse and repeat for the other data objects.
 */
describe('Identity', function(){
  it('should return HTTP 200', function(done){
    server.get('/api/Identities/1')
       .set('Accept', 'application/json')
       .expect(200,done);
  });

  it('should return an Identity object', function(done){
     server.get('/api/Identities/1')
       .set('Accept', 'application/json')
       .expect(200)
       .end(function(err, res){
         expect(res.body).to.have.property('email')
         expect(res.body.email).to.exist
         done();
       })
  });

  
});

