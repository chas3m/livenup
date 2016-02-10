import CREATE_SPACE from '../actions/creator_actions';
import UPDATED_USERSPACE from '../actions/creator_actions';
import FETCH_USER_SPACES from '../actions/spaces_actions';
import DELETE_SPACE from '../actions/spaces_actions';

export default function(state = [], action) {
  switch(action.type) {
    case DELETE_SPACE:
      return action.payload.data;
    case UPDATED_USERSPACE:
      return state.slice();
    case CREATE_SPACE:
      if(action.payload === undefined) {
        //basic error handling
        console.error('++++Payload in reducer_userSpaces for action CREATE_SPACE is undefined');
        return state;
      }

      return [...state, action.payload.data];
    case "FETCH_USER_SPACES":
      if(action.payload === undefined) {
        //basic error handling
        console.error('++++Payload in reducer_userSpaces for action CREATE_SPACE is undefined');
        return state;
      }

      return action.payload.data;

    default: return state;
  }
  return state;
}
