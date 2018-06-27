const express       = require('express');
const mongoose       = require('mongoose');
const cookieSession  = require('cookie-session');
const passport       = require('passport');
const keys          = require('./config/keys');
const bodyParser    = require('body-parser');

//mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURL);// connect to mongo

require('./models/User'); // define user
require('./services/passport'); // passport


const app  = express();
// middlewares -- preprocessing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 1000*60*60*24*30,
    keys: [keys.cookieKey]// this could be anything
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




const port         = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server working");
});
