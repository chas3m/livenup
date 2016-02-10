//////////////
//imports
//////////////
import axios from 'axios'; // to handle http requests to api
//////////////
//end imports
//////////////

/////////////////
//Fetch inspirations based on space selected in previous page
/////////////////

export const FETCH_SPACE_INSPIRATIONS = "FETCH_SPACE_INSPIRATIONS";
export const SELECT_SPACE_INSPIRATION = "SELECT_SPACE_INSPIRATION";

export function fetchInspirations(room) {
const request = axios.post('/inspirations', {
    inspirations: {
      category: room
    }
  })
  .catch((response) => {
    if (response instanceof Error) {
      console.error('GET | Error sending reponse', response);
    } else {
      console.log('GET | error from server', response);
    }
  })

return {
  type: FETCH_SPACE_INSPIRATIONS,
  payload: request
}
}

//////////////////
//end fetch
////////////////

///////////////
// select inspiration
///////////////
export function selectInspiration(selectedInspiration) {
  return {
    type : SELECT_SPACE_INSPIRATION,
    payload: selectedInspiration
  };
}

/////////////
//end select
////////////
