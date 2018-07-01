/*
renders  the form

*/
import React, { Component } from 'react';
import { Field ,reduxForm } from  'redux-form';
import { Link } from  'react-router-dom';
import { renderTextField, renderAreaField, validate } from './SurveyField';
// renderEmailField,

class SurveryForm extends Component{
   render(){
        return (
        <div>
          <form style={{margin: '25px 0px'}} onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
            <Field
              label="Survey Title"
              name="title"
              component={renderTextField}
            />

            <Field
              label="Subject Line"
              name="subject"
              component={renderTextField}
            />

            <Field
              label="Content"
              name="body"
              component={renderAreaField}
            />
            <Field
              label="Recipient List"
              name="recipients"
              component={renderTextField}
            />
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
            <button type="submit" className="teal btn-flat right white-text">
              Next
              <i className="material-icons right">done</i>
            </button>

          </form>
        </div>
      );
    }
}
//this.props.handleSubmit -- is provided to us by redux from this function
export default reduxForm({ // must include with redux form
  form: "SurveyForm",
  validate,
  destroyOnUnmount: false   //dont kill the form when its not being show on the screen
})(SurveryForm);

/*
_map(arrayofObject, ( {elem, elem} )=>{}) using lodash to iterate through objects
return an array of values
*/
