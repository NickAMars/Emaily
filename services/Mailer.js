const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
//sendgrid.setApiKey(keys.sendGridKey);

class Mailer extends helper.Mail{
  constructor({ subject, recipients }, content){
    super();
    //set up send grid api
    this.sgApi = sendgrid(keys.sendGridKey);
    // this tells them that we are not going to reply
    this.from_email = new helper.Email('no-reply@nam.com');// our email
    this.subject = subject; // topic
    this.body = new helper.Content('text/html', content); // body
    this.recipients = this.formatAddresses(recipients);

    // build in function with helper.Mail
    this.addContent(this.body);
    this.addClickTracking();
    // take and process recipients
    this.addRecipients();
  }
  formatAddresses(recipients){
    return recipients.map(({ email }) => {// pull off the email
      return new helper.Email(email);
    });
  }
  addClickTracking(){// from sendGrid
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking  =new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients(){
    const personalize = new helper.Personalization();
    // iterate over recipient and add them to the personalize object
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    //add the personalize object
    this.addPersonalization(personalize);
  }
  async send(){ //out the email
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }

}

module.exports = Mailer;
