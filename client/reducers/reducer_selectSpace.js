import { SELECT_SPACE } from '../actions/index';

//action payload = space clicked on by user in main view
export default function(state = null, action) {
  switch(action.type) {
    case SELECT_SPACE:
      return action.payload;
  }
  return state;
}
