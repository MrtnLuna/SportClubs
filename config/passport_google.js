const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user')


const googleConfig = function(app){
    passport.use(
        new GoogleStrategy({
       // options for strategy
       callbackURL: '/auth/google/redirect',
       clientID: keys.google.clientID,
       clientSecret: keys.google.clientSecret
   
       }, (accessToken, refresToken, profile, done) =>{
           //passport callback function
           //access token is the info form google
           //when expires token
           //done when we done this call function
   
           console.log('passport callback function');
           
           User.findOne({googleID: profile.id}).then((user) =>{
               if(user){
                   done(null,user)
               }else{
                   let newUser = new User({
                       googleID: profile.id,
                       name: profile.name.givenName
                   }).save().then((newUser) =>{
                       console.log('New User: ' ,newUser);
                       done(null,newUser)
                   })
               }
           })
   
         
   
          
       })
    )}


    module.exports = googleConfig