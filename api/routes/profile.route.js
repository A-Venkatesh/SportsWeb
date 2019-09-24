const express = require('express');
const app = express();
const profileRoutes = express.Router();
const jwt = require('jsonwebtoken');

// Require profile model in our routes module
let Profile = require('../models/Profile');

// Defined store route

let canSave = 1
userRoutes.post('/', (req, res) => {
  let userData = req.body
  let profile = new Profile(userData)
  
  


  Profile.findOne({UserName: userData.UserName}, (err, profile) => {
    if (err) {
      console.log(err)    
    } else {
      if (profile!==null) {
        res.status(400).send('UserName Exist');
        
      }

      else {      
        
        canSave = 3;
        console.log('came da ',canSave);
        verify(req,res)
       
    }
    }
    
  })
  console.log("55555");


  
})

userRoutes.post('/login', (req, res) => {
  let userData = req.body
  Profile.findOne({UserName: userData.UserName}, (err, profile) => {
    if (err) {
      console.log(err)    
    } else {
      if (!profile) {
        res.status(401).send('Invalid Email')
      } else 
      {
        if ( profile.UserName !== userData.UserName){    
          res.status(401).send('Invalid Profile Name')
        }
        else{
      if ( profile.Password !== userData.Password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: profile._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
    }
    }
  })
})

module.exports = profileRoutes;