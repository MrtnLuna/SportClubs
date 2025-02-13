const router = require('express').Router();
const passport = require('passport')
//auth login
router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/logout', (req,res) =>{
    //handle with passport
    req.logout();
    res.redirect('/')
})

//auth with google
router.get('/google',passport.authenticate('google',{
    //what information we need
    scope: ['profile']
}))

//callback route for google to redirect to 
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    res.redirect('/profile')
})

router.get('/facebook',passport.authenticate('facebook',{
    //what information we need
    scope: 'read_stream'
}))

//callback route for google to redirect to 
router.get('/facebook/redirect', passport.authenticate('facebook'), (req,res)=>{
    res.redirect('/profile')
})


module.exports = router; 