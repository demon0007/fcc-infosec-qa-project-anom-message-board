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
    
    .get((req, res) => {
      let board = req.params.board
      
      let findResult = DB.collection(board).find({}).sort({bumped_on: -1}).limit(10)
      
      findResult.toArray((err, array) => {
        if (err)
          res.send('Fetching Array')
        else {
          let threadArray = array.map(thread => {
            delete thread['delete_password']
            delete thread['reported']
            let sortedReplies = thread.replies.sort((a, b) => {
              return new Date(b.created_on) -  new Date(a.created_on)
            })
            // console.log()
            sortedReplies = sortedReplies.map(reply => {
              delete reply['delete_password']
              delete reply['reported']
              return reply
            })
            thread['replies'] = sortedReplies.slice(0, 3)
            return thread
          })
          res.json(threadArray)
        }
      })
      
    })
    
  app.route('/api/replies/:board')
    
    .post((req, res) => {
      let board = req.params.board
      let tid = ObjectId(req.body.thread_id)
      let rid
      console.log('POST Request')
      DB.collection(board).findOne({_id: ObjectId(tid)}, (err, match) => {
        console.log(match)
        rid = 'c'+match.replies.length
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

        DB.collection(board).findOneAndUpdate(
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
    })
    
    .get((req, res) => {
      var board = req.params.board
      var tid = req.query.thread_id
      
      DB.collection(board).findOne(
        {thread_id: ObjectId(tid)},
        (err, match) => {
          if (err)
            res.send('Error In Fetching Replies')
          else
            res.json(match.replies)
        }
      )
    })

};
