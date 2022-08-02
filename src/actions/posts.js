import * as api from '../api';
import { FETCH_ALL, FETCH_BY_ID, FETCH_BY_SEARCH, FETCH_POST_DETAILS, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

import { LIMIT } from '../constants/constants';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ 
      type : FETCH_ALL, 
      payload : { 
        data: data.data, currentPage: page, totalPage: Math.ceil(Number(data.num)/LIMIT) 
      }
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({  type : FETCH_BY_ID, payload : data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ 
      type : FETCH_BY_SEARCH, 
      payload: {
        data: data.data, currentPage: searchQuery.page, totalPage: Math.ceil(Number(data.num)/LIMIT)
      }
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostDetails(id);
    dispatch({  type : FETCH_POST_DETAILS, payload : data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.submitPost(newPost);
    dispatch({ type : CREATE, payload : {...newPost, ...data} });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    await api.updatePost(id, updatedPost);
    dispatch({ type : UPDATE, payload : updatedPost });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type : DELETE, payload : { _id: id } });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type : LIKE, payload : { _id: id, likes: data} });
  } catch (error) {
    console.log(error?.response);
  }
}