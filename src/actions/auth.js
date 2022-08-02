import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';

// Action Creators
export const googleSignin = (result, token) => ({ type: AUTH, payload: { result, token }});

export const logout = () => ({ type: LOGOUT });

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // login the user
    const { data } = await api.signin(formData);
    dispatch({ type : AUTH, payload : data });
    navigate('/');
  } catch (error) {
    console.log(error?.response);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signup the user
    const { data } = await api.signup(formData);
    dispatch({ type : AUTH, payload : data });
    navigate('/');
  } catch (error) {
    console.log(error?.response);
  }
}
