/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoClient = require('mongodb').MongoClient
const CONN = process.env.DB
var DB

mongoClient.connect(CONN, (err, dba) => {
  if (err)
    console.log('Connection Failure')
  else
    console.log('Connection Successful')
    DB = dba
})



module.exports = function (app) {
  
  app.route('/api/threads/:board')
    
    .post((req, res) => {
      let board = req.params.board
      let newThread = req.body //{"board":"hero","text":"This is stupid","delete_password":"black"}
      
      newThread['created_on'] = new Date()
      newThread['bumped_on'] = new Date()
      
      // db.collection(board).insert()
      
    })
    
  app.route('/api/replies/:board');

};
