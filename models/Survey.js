const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');


const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // embedding data
  yes: { type : Number , default: 0 },
  no: { type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  dateSent: {type: Date, default: Date.now},
  lastResponded: Date
});

module.exports = mongoose.model('surveys', surveySchema);
