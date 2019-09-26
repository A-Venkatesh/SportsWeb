const express = require('express');
const app = express();
const profileRoutes = express.Router();
const jwt = require('jsonwebtoken');

// Require profile model in our routes module
let Profile = require('../models/Profile');

// Defined store route

let canSave = 1


profileRoutes.route('/edit').post(function (req, res) {
  let profileData = req.body
  let profile = new Profile(profileData)
  



  Profile.findOne({UserName: profileData.UserName}, (err, profile) => {
    if (err) {
      console.log('Error da ');
      
      console.log(err)    
    } else {
      if (profile==null) {
        profile.save()
      .then(profile => {
        res.status(200).json({'Profile': 'Profile has been added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
        
      }

      else {      
        profile.id = req.body.id;
        profile.UserName = req.body.UserName;
        profile.Fname = req.body.Fname;
        profile.Lname = req.body.Lname;
        profile.PhNo = req.body.phNo;
        profile.Fav = req.body.fav;
        profile.DOB = req.body.DOB;        

      profile.save().then(profile => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
        canSave = 3;
        console.log('came da ',canSave);
       
    }
    }
    
  })
  console.log("55555");


  
})

profileRoutes.post('/login', (req, res) => {
  let profileData = req.body
  Profile.findOne({UserName: profileData.UserName}, (err, profile) => {
    if (err) {
      console.log(err)    
    } else {
      if (!profile) {
        res.status(401).send('Invalid Email')
      } else 
      {
        if ( profile.UserName !== profileData.UserName){    
          res.status(401).send('Invalid Profile Name')
        }
        else{
      if ( profile.Password !== profileData.Password) {
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