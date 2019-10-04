const express = require('express');
const app = express();
const profileRoutes = express.Router();
const jwt = require('jsonwebtoken');

// Require profile model in our routes module
let Profile = require('../models/Profile');

// Defined store route
profileRoutes.route('/add').post(function (req, res) {
  let profile = new Profile(req.body);
  profile.save()
    .then(profile => {
      res.status(200).json({'Profile': 'Profile has been added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
profileRoutes.route('/get').post(function (req, res) {
  let profileData = req.body
  Profile.findOne({UserName: profileData.UserName}, function (err, profiles){
    if(err){
      res.json(profiles);
      console.log(err);
    }
    else {
      res.json(profiles);
    }
  });
});

// Defined edit route
profileRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Profile.findById(id, function (err, profile){
      res.json(profile);
  });
});

//  Defined update route
profileRoutes.route('/update').post(function (req, res) {
  let profileData = req.body
  Profile.findOne({UserName: profileData.UserName}, function(err, profile) {
    if (!profile){
      let profile = new Profile(profileData);
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
        profile.PhNo = req.body.PhNo;
        profile.Fav = req.body.Fav;
        profile.DOB = req.body.DOB;   

      profile.save().then(profile => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
profileRoutes.route('/delete/:id').get(function (req, res) {
    Profile.findByIdAndRemove({_id: req.params.id}, function(err, profile){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.profileId = payload.subject
  next()
}
function verify(req, res) {
  let profileData = req.body
  let profile = new Profile(profileData)

    profile.save((err, registeredProfile) => {

      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredProfile._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  

}
let canSave = 1
profileRoutes.post('/register', (req, res) => {
  let profileData = req.body
  let profile = new Profile(profileData)
  
  


  Profile.findOne({ProfileName: profileData.ProfileName}, (err, profile) => {
    if (err) {
      console.log(err)    
    } else {
      if (profile!==null) {
        res.status(400).send('ProfileName Exist');
        
      }

      else {      
        
        canSave = 3;
        verify(req,res)
       
    }
    }
    
  })


  
})

profileRoutes.post('/login', (req, res) => {
  let profileData = req.body
  Profile.findOne({ProfileName: profileData.ProfileName}, (err, profile) => {
    if (err) {
      console.log(err)    
    } else {
      if (!profile) {
        res.status(401).send('Invalid Email')
      } else 
      {
        if ( profile.ProfileName !== profileData.ProfileName){    
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