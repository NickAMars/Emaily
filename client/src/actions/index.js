import axios from 'axios';
//import { FETCH_USER } from './type';

export const FETCH_USER = 'fetch_user';
export const FETCH_SURVEYS = 'fetch_surveys';

export const  fetchUser = () =>
  async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch( {type: FETCH_USER, payload: res.data } );
  }

export const handleToken = (token) =>
  async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch( {type: FETCH_USER, payload: res.data } );
  }

export const submitSurvey = (values, history) => async dispatch => {
  ///console.log('submitSurvey');
  const res = await axios.post('/api/surveys', values);
  // navigate to another route after review form
  history.push('/surveys');
  dispatch( {type: FETCH_USER, payload: res.data } );
  //return { type: 'submit_survey'};
}

// query through surveys 
export const fetchSurveys = () => async dispatch =>{
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
