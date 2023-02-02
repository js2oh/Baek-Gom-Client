// import { combineReducers } from 'redux';
import posts from './posts';
import currentId from './currentId';
import auth from './auth'

// Combine the reducers into the root reducer
const rootReducer = {
  posts,
  currentId,
  auth,
};

export default rootReducer;
