import axios from 'axios';

export const FETCH_USER_SPACES = "FETCH_USER_SPACES";
export const DELETE_SPACE = "DELETE_SPACE";

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

export function deleteSpace(id) {
  var token =  window.localStorage.getItem('token');
  let ax = axios.create({headers: {'token': token}});
  const request = ax.delete('/space', {
    params: {'id': id}
  }).catch((response) => {
    if(response  instanceof Error) {
      console.error('GET | Error sending reponse',response);
    }else {
      console.log('GET | error from server', response);
    }
  });

  return {
    type: DELETE_SPACE,
    payload: request
  }
}
