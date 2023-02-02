import { AUTH, LOGOUT } from '../constants/actionTypes';

// User Authentication Reducer
const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // Save the user's credential data in-memory storage
      localStorage.setItem('profile', JSON.stringify(
        {...action.payload, result: { ...action.payload.result }}
      ));
      // Save the user's credential data in the global state
      return {...state, authData: {...action.payload, result: { ...action.payload.result }}};
    case LOGOUT:
      // Clear out the in-memory storage
      localStorage.clear();
      // Assign null value to the authData state
      return {...state, authData: null};
    default:
      return state;
  }
};

export default auth;
