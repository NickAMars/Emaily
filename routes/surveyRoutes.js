const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');


module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {

    const surveys = await Survey.find({ _user: req.user.id }). select({
      recipients: false // not including
    });
    res.send(surveys);

  });
  // get request
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send ('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {// connected with sengrid
    //  console.log(req.body);    // event
    const path = new Path('/api/surveys/:surveyId/:choice');
     // a list of event show up every 30 min in the req.body
    /*const events = _.map(req.body,({ email, url}) => {
      const match = path.test(new URL(url).pathname); // take out the changing variable
      if(match){ // see if its null
        return { email , surveyId: match.surveyid, choice: match.choice };
      }
    });
  //  console.log(events);
    const compactEvents = _.compact(events); // return only event objects
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');// no duplicate email and survey id
    console.log(uniqueEvents);
    */
    _.chain(req.body)
    .map(({ email, url}) => {
      const match = path.test(new URL(url).pathname); // take out the changing variable
      if(match){ // see if its null
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact() // return only event objects
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
    //  console.log(surveyId);
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false } // find element that matches
            }
          },
          {
            $inc: { [choice]: 1 }, //selector operation [choice] gets incremented by $inc
            $set: { 'recipients.$.responded': true }, // updating a sub document in mongo
            lastResponded: new Date()
          }
        ).exec();
      })
    .value();// no duplicate email and survey id
  //  console.log(events);
    res.send({});
  });

  // post request
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; // from the form
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(  email => ({ email : email.trim() })  ),
      _user: req.user.id
    }); // havent save it yest

//sendGrid
//great place to send an email
                //everything else //body
  const mailer = new Mailer(survey, surveyTemplate(survey));
    try{
      //send the emails
      await mailer.send();
      // save the survey
      await survey.save();
      //take off one credit from our user
      req.user.credits -= 1;
      //save the user
      const user = await req.user.save();
        res.send(user);
    }catch(error){
      res.status(422).send(err); // unprocess entity
    }
  });
};
