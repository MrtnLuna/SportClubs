const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys')
const User = require('../models/user')


const facebookConfig = function(app){
    
    passport.use(
        new FacebookStrategy({
       // options for strategy
       callbackURL: '/auth/facebook/redirect',
       clientID: keys.facebook.clientID,
       clientSecret: keys.facebook.clientSecret
       
       }, (accessToken, refresToken, profile, done) =>{
           //passport callback function
           //access token is the info form google
           //when expires token
           //done when we done this call function
            console.log(profile)
           console.log('passport callback function with Facebook');
           
           User.findOne({googleID: profile.id}).then((user) =>{
               if(user){
                   done(null,user)
               }else{
                   let newUser = new User({
                       facebookID: profile.id,
                       name: profile.name.givenName
                   }).save().then((newUser) =>{
                       console.log('New User: ' ,newUser);
                       done(null,newUser)
                   })
               }
           })
   
         
   
          
       })
    )}


    module.exports = facebookConfig