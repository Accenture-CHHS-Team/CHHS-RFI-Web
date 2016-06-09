var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var server = supertest.agent("http://localhost:3000");

/*
 * Lets us know that the API keys are set up and working,
 * that distances are being calculated, and that the 
 * distance is > 0 and < 2000 meters
 */
describe('Facility', function(){ 
    it('should return search results', function(done){
        var address = {
            streetAddress : '291 Geary St',
            city : 'San Francisco',
            state : 'CA',
            zip : '94102',
            radius : '2000'
        };
        server.post('/api/Facilities/listByAddress')
          .set('Accept', 'application/json')
          .send(address)
          .expect(200)
          .end(function(err, res){
            expect(res.body).to.have.property('result')
            expect(res.body.result).to.exist
            expect(res.body.result).to.have.property('OK')
            expect(res.body.result.OK).to.be.true
            expect(res.body.result).to.have.property('facilities')
            expect(res.body.result.facilities).to.have.length.above(0)
            expect(res.body.result.facilities[0]).to.have.property('location')
            expect(res.body.result.facilities[0].location).to.exist
            expect(res.body.result.facilities[0].location).to.have.property('distance')
            expect(res.body.result.facilities[0].location.distance).to.exist
            expect(res.body.result.facilities[0].location.distance).to.be.above(0)
            expect(res.body.result.facilities[0].location.distance).to.be.below(2001)
            done();
          })
    });
});