/*
Storing the field detail here for redux form
// field and values are send from redux-form into the respected functions
*/
import React from 'react';
import validateEmails from '../../utils/validateEmails';

export const  renderTextField  = (field) => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? "red-text" : ""}`;
  return (
      <div className={className}>
       <label>{field.label}</label>
       <input className="form-control" type="text" {...field.input} />
       <div className="text-help" style={{marginBottom: '5px'}}>
          {touched ? error : "" }
       </div>
      </div>
   );
 }
 /*export const  renderEmailField = (field) =>  {
   const { meta: { touched, error } } = field;
     const className = `form-group ${touched && error ? "red-text" : ""}`;
   return (
       <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="email" placeholder="nam@gmail.com" {...field.input} />
        <div className="text-help" style={{marginBottom: '5px'}}>
           {touched ? error : ""}
        </div>
       </div>
    );
  }
  */
 export  const renderAreaField = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "red-text" : ""}`;
   return (
       <div className={className}>
        <label>{field.label}</label>
        <textarea className="form-control" {...field.input} >
        </textarea>
        <div className="text-help" style={{marginBottom: '5px'}}>
           {touched ? error : ""}
        </div>
       </div>

    );
  }

  export const validate = (values) => { // value gets all the input data
    const errors = {};
    // errors.nameField
    if (!values.title) {
      errors.title = "Enter a title";
    }
    if (!values.subject) {
      errors.subject = "You have not entered a subject";
    }
    if (!values.body) {
      errors.body = "Enter some content please";
    }
    errors.recipients = validateEmails(values.recipients || '');
    if (!values.recipients) {
      errors.recipients = "You didnt enter an email";
    }

    return errors;
  }
  /*_.each(arrayofObject,({name}) => { values[name]})
    dont return a value but can be use to update fields
  */
