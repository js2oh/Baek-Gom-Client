// import { combineReducers } from 'redux';
import posts from './posts';
import currentId from './currentId';
import auth from './auth'

const rootReducer = {
  posts,
  currentId,
  auth,
};

export default rootReducer;