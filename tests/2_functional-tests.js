/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      chai.request(server)
        .post('/api/threads/test')
        .send({"board":"hero","text":"This is stupid","delete_password":"black"})
        .end((req, res) => {
          assert.equal(res.status, 200)
          res.should.redirectTo('/b/hero')
        })
    });
    
    suite('GET', function() {
      chai.request(server)
        .get('/api/threads/test')
        .end((req, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.isArray(res.body[0].replies)
          assert.notProperty(res.body[0], 'reported')
          assert.property(res.body[0], 'text')
          assert.equal(res.body[0].text, 'This is stupid')
        })
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
