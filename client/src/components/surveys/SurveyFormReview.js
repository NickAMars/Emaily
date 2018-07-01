import React from 'react'
import {connect} from 'react-redux';
import {submitSurvey} from '../../actions';
// for automatic navigation
import { withRouter } from 'react-router-dom';


// could make this shorter with lodash
const SurveyReview = ({ onCancel , formValues, submitSurvey, history }) => {
  //console.log(formValues);
  return (
    <div>
    <h5> Please confirm your entries </h5>
    <div>
      <div>
        <label> Survey Title </label>
        <div> { formValues.title } </div>
      </div>
      <div>
        <label> Subject Line </label>
        <div> { formValues.subject } </div>
      </div>
      <div>
        <label> Survey Content </label>
        <div> { formValues.body } </div>
      </div>

      <div>
        <label> Survey emails </label>
        <div> { formValues.recipients } </div>
      </div>

    </div>

      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={ onCancel}
      >
        Back
      </button>

      <button
      onClick={() => submitSurvey(formValues, history) }
      className="green white-text btn-flat right"
      >
        Submit
        <i className="material-icons right "> email </i>
      </button>

    </div>
  );

}

function mapStateToProps(state){
  return {
        formValues: state.form.SurveyForm.values
  };
}

// withRouter gives us the history object which knows about the routes
export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyReview));
