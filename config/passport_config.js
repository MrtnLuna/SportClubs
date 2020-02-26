const passport = require('passport');
const User = require('../models/user')

const passportConfig = function(app){
    app.use(passport.initialize());
    app.use(passport.session())

    passport.serializeUser((user,done) =>{
        done(null,user.id); 
    })
    
    passport.deserializeUser((id,done) =>{
        User.findById(id).then((user) =>{
            done(null, user)
        })
        
    })

    require('./passport_google')(app)
    require('./passport_facebook')(app)
}


module.exports = passportConfig