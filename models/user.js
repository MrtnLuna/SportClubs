const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String, 
        required: true 
    },
    googleID: String,
    facebookID: String

});


const User = mongoose.model('user', userSchema);
module.exports = User;