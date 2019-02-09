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
      newThread['reported'] = true
      newThread['replies'] = []
      
      DB.collection(board).insert(newThread, (err, doc) => {
        if (err)
          res.send('Thread Insertion Error')
        else
          res.redirect('/api/threads/'+board)
      })
      
    })
    
  app.route('/api/replies/:board')
    
    .post((req, res) => {
      let board = req.params.board
      let newReply = {
        _id: req.body.thread_id,
        text: req.body}
    })

};
