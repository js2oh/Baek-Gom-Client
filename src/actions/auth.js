import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';

// Action Creators for User Authentication

// Sign-in using Google OAuth
export const googleSignin = (result, token) => ({ type: AUTH, payload: { result, token }});

// Sign-out and remove the user credential data stored in-memory
export const logout = () => ({ type: LOGOUT });

// Sign-in using tranditional method of verifying the user credential data
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Sign-in the user through the backend-server (verify the existing user)
    // Return the user credential data with jwt token
    const { data } = await api.signin(formData);
    dispatch({ type : AUTH, payload : data });
    navigate('/');
  } catch (error) {
    console.log(error?.response);
  }
}

// Sign-up new user and sign-in right after
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // Sign-up the user through the backend-server (create a new user)
    // Return the user credential data with jwt token
    const { data } = await api.signup(formData);
    dispatch({ type : AUTH, payload : data });
    navigate('/');
  } catch (error) {
    console.log(error?.response);
  }
}
