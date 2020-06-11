const express = require('express');
const db = require('./userDb')
const { validateUserId, validateUser } = require('./../middleware/validateUserMiddleware')
const router = express.Router();



router.post('/', validateUser(), (req, res) => {
  // do your magic!
  const user = req.user
  db.insert(user)
    .then(userResponse => { 
      res.status(201).json({
        "Message": "Successfully created",
        "User": userResponse
      });
    })
    .catch(err => {
      res.status(500).json({
        "Message": "Server error"
      });
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(getResponse => {
      res.status(200).json({
        "Message": "Get Successful",
        "User_Response" : getResponse
      })
    }).catch(error => {
      res.status(200).json({
        "Message": "Get Successful",
        "Error" : error
      })
    }) 
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
    res.status(200).json({
      "Message": "Successful",
      "User": res.body
    })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  const user_id = res.body.id;
  db.getUserPosts(user_id)
    .then(user => {
      res.status(200).json({
        "Message" : "Successful",
        "Response": user      
      })
    }).catch(error => {
      res.status(200).json({
        "Message" : "Successful",
        "Error": error      
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  const user_id = res.body.id;
  db.remove(user_id)
  .then(userResponse => {
    
    if(userResponse === 0 ){
      return res.status(200).json({  
        "Message" : "Couldn't find user at " + user_id ,
      })
    }
    res.status(200).json({  
      "Message" : "Delete Successful",
    })
  }).catch(error => {
    res.status(200).json({  
      "Message" : "Server Error",
      "Error": error
    })
  })
  // do your magic!
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // do your magic!
  const user = req.user;
  const user_id = res.body.id;
  db.update(user_id, user)
    .then( userResponse => {
      if(userResponse === 0){
        return res.status(500).json({  
          "Message" : "Cant update user at" + user_id,
        })
  
      }else {
      res.status(200).json({  
        "Message" : "Update Successful",
      })
      }
    })
    .catch(err =>{
      res.status(400).json({  
        "Message" : "Server Error",
        "Error": err
      })
    })
});

module.exports = router;