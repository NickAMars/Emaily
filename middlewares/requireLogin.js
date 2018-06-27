module.exports = (req, res, next ) => {// make sure the user is log in 
  if(!req.user){
    return res.status(401).send({err: 'You Must Log in!'});
  }
  next();
};
