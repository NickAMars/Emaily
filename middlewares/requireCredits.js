module.exports = (req, res, next ) => {// make sure the user is log in
  if(req.user.credits < 1){
    return res.status(403).send({err: 'Not enough credits!'});
  }
  next();
};
