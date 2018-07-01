const passport      = require('passport');
module.exports = app => {

  app.get('/auth/google',
   passport.authenticate('google', {scope:['profile','email']})
  );

  app.get('/auth/google/callback',
   passport.authenticate('google'),
    (req, res) =>{
    res.redirect('/surveys'); // go to route after log in with google in successful
  });

  app.get('/api/logout',(req,res) =>{
    req.logout();
    res.redirect('/');
    //res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
