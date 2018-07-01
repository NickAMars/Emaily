/*

*/
import React, { Component } from 'react';
import SurveryForm from './SurveyForm';
import {reduxForm } from  'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveryNew extends Component{
  /*  constructor(props){
      super(props);
      this.state = {new:true};
    }
*/
    state = { formFormReview: false };
    renderContent(){
      if (this.state.showFormReview){
        return (
          <SurveyFormReview
            onCancel = {() => this.setState({ showFormReview: false })}
          />
        );
      }
      return(
      <SurveryForm
        onSurveySubmit ={() => this.setState({ showFormReview: true })}
      />
    );
    }


    render(){
        return (
        <div>
          {this.renderContent()}
        </div>
      );
    }
}

//export default SurveryNew;
export default reduxForm({ // removes the form information when leave the  Form fields
    form: 'SurveyForm'
})(SurveryNew);
