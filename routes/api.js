/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect      = require('chai').expect;
var mongoClient = require('mongodb').MongoClient
var ObjectId    = require('mongodb').ObjectId
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
      newThread['reported'] = false
      newThread['replies'] = []
      
      DB.collection(board).insert(newThread, (err, doc) => {
        if (err)
          res.send('Thread Insertion Error')
        else
          res.redirect('/b/'+board)
      })
      
    })
    
  app.route('/api/replies/:board')
    
    .post((req, res) => {
      let board = req.params.board
      let tid = ObjectId(req.body.thread_id)
      let rid
      console.log('POST Request')
      DB.collectoion(board).findOne()
      
      let newReply = {
        _id: rid,
        text: req.body.text,
        created_on: new Date(),
        delete_password: req.body.delete_password,
        reported: false
      }
      
      let update = {
        $set: {bumped_on: new Date()},
        $push: {replies: newReply}
      }
      
      DB.collection(board).findOneAndModify(
        {_id: tid},
        update,
        (err, doc) => {
          if (err)
            res.send('Error in Adding Reply')
          else
            res.redirect('/b/'+board+'/'+rid)
        }
      )
    })

};
