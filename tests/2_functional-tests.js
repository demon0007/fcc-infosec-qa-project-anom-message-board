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

let tid
let pass

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      chai.request(server)
        .post('/api/threads/test')
        .send({"board":"hero","text":"This is stupid","delete_password":"black"})
        .end((req, res) => {
          assert.equal(res.status, 200)
          // res.should.redirectTo('/b/test')
          // done()
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
          tid = res.body[0]._id
          pass = res.body[0].delete_password
          // done()
        })
    });
    
    suite('DELETE', function() {
      chai.request(server)
        .delete('/api/threads/test')
        .send({thread_id: tid,"delete_password": pass})
        .end((req, res) => {
          console.log(res.text)
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          tid = '5c5eec4a532e3a450ca6cc8a'
          // done()
        })
    });
    
    // suite('PUT', function() {
    //   chai.request(server)
    //     .put('/api/threads/test')
    //     .send({thread_id: tid})
    //     .end((req, res) => {
    //       assert.equal(res.status, 200)
    //       assert.equal(res.text, 'success')
    //       // done()
    //     })
    // });
    // });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      chai.request(server)
        .post('/api/replies/Naruto')
        .send({
          thread_id: '5c5eec4a532e3a450ca6cc8a',
          rid: 'rid',
          text: 'Test One',
          delete_password: 'Delete',
        })
        .end((req, res) => {
          assert.equal()
          // assert.equal(res.status, 200)
          // assert.equal(res.text, 'success')
          // done()
        })
    });
    
    suite('GET', function() {
      // done()
    });
    
    suite('PUT', function() {
      // done()
    });
    
    suite('DELETE', function() {
      // done()
    });
    
  });

});
