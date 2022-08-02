import { AUTH, LOGOUT } from '../constants/actionTypes';

const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify(
        {...action.payload, result: { ...action.payload.result }}
      ));
      return {...state, authData: {...action.payload, result: { ...action.payload.result }}};
    case LOGOUT:
      localStorage.clear();
      return {...state, authData: null};
    default:
      return state;
  }
};

export default auth;