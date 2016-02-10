import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from '../actions/auth_actions';

//when user is authenticated after sign up or log in, token received from server is set both in local storage and in redux state
export default function (state = { token: localStorage.getItem('token') }, action) {
  switch(action.type) {
  case SIGNUP_USER:
    localStorage.setItem('token', action.payload.headers.token);
    return Object.assign({}, state,
      { token: localStorage.getItem('token') });
  case LOGIN_USER:
    localStorage.setItem('token', action.payload.headers.token);
    return Object.assign({}, state,
      { token: localStorage.getItem('token') });
  case LOGOUT_USER:
    localStorage.removeItem('token');
    return Object.assign({}, state,
      { token: localStorage.getItem('token') });
  default:
    return state;
  }
}
