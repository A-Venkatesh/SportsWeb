const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
  UserName: {
    type: String
  },
  
  Fname: {
    type: String
  },
  Lname: {
    type: String
  },
  PhNo: {
    type: Number
  },
  Fav: {
    type: String
  },
  DOB: {
    type: String
  }
},{
    collection: 'Profile'
});

module.exports = mongoose.model('Profile', Profile);