var express = require('express');
var passport = require('passport')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/success', (req,res,next) => {
  let user = req.user;
  res.render('success.ejs', {user})
})

router.get('/failure', (req,res,next) => {
  res.render('failure.ejs')
})



// github strategy 
router.get('/auth/github',passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure' }),(req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });


  // google strategy 
  router.get('/auth/google',passport.authenticate('google', { scope: ['email','profile'] }));

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });

  // logout 
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
