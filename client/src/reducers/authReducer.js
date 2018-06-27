import { FETCH_USER } from '../actions';
export default function(state = null, action){
//  console.log(action);

  switch (action.type) {
    case FETCH_USER :
      return action.payload || false;
      break;
    default:
      return state;
  }

}
