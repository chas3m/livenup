import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

//signup and login requests generate a promise; thanks to redux-promise middleware, action will only be sent when promise resolves

export function signupUser(email, password) {
  const request = axios.post('/signup', {user: {
    email: email,
    password: password
  }}).catch((response) => {
    if(response instanceof Error) {
      console.error('POST | Error sending reponse', response);
    } else {
      console.log('POST | error from server', response);
    }
  });

  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function loginUser(email, password) {
  const request = axios.post('/login', {user: {
    email: email,
    password: password
  }}).catch((response) => {
    if(response instanceof Error) {
      console.error('POST | Error sending reponse', response);
    } else {
      console.log('POST | error from server', response);
    }
  });

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
