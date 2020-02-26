const express = require('express')
//const passportSetup = require('./config/passport-setup')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const mongoose = require('mongoose')

const keys = require('./config/keys')
const cookieSesion = require('cookie-session')
const passport = require('passport')

const app = express();


//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSesion({
    maxAge: 2 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

/*
// init passport
app.use(passport.initialize());
app.use(passport.session())
*/
require('./config/passport_config')(app)


//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI , () =>{
    console.log('Connect with mongoDB')
})

//set up routes
app.use('/auth',authRoutes);
app.use('/profile', profileRoutes)


//create home route
app.get('/', (req, res)=>{
    res.render('home', {user : req.user})
})


app.listen(3000, () =>{
    console.log('Server is listening on port 3000')
});