import { SET, CLEAR } from '../constants/actionTypes';

// Action Creators for the current id of the form
export const setCurrentId = (id) => ({ type: SET, payload : id });
export const clearCurrentId = () => ({ type: CLEAR });
