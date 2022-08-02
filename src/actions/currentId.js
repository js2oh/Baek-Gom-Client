import { SET, CLEAR } from '../constants/actionTypes';

// Action Creators
export const setCurrentId = (id) => ({ type: SET, payload : id });

export const clearCurrentId = () => ({ type: CLEAR });
