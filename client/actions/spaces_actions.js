import axios from 'axios';

export const FETCH_USER_SPACES = "FETCH_USER_SPACES";

export function fetchUserSpaces() {
  var token =  window.localStorage.getItem('token');
  let ax = axios.create({headers: {'token': token}});
  const request = ax.get('/space').catch((response) => {
    if(response  instanceof Error) {
      console.error('GET | Error sending reponse',response);
    }else {
      console.log('GET | error from server', response);
    }
  });

  return {
    type: FETCH_USER_SPACES,
    payload: request
  }
}
