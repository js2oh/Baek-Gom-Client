import * as api from '../api';
import { FETCH_ALL, FETCH_BY_ID, FETCH_BY_SEARCH, FETCH_POST_DETAILS, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

import { LIMIT } from '../constants/constants';

// Action Creators for Posts

// Fetch the posts
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // Fetch all the posts of the given page number and the total number of posts
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

// Fetch a post by an id
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // Fetch the post by the id
    const { data } = await api.fetchPost(id);
    dispatch({  type : FETCH_BY_ID, payload : data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

// Search the posts by search parameters
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // Fetch the posts by the searchQuery (page, search terms, tags) and its total number
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

// Fetch the post details by an id
export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // Fetch the post by the id and its recommended posts
    const { data } = await api.fetchPostDetails(id);
    dispatch({  type : FETCH_POST_DETAILS, payload : data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

// Create a post in the database
export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // Create a new post document given the post details and get back the server-side post data
    const { data } = await api.submitPost(newPost);
    dispatch({ type : CREATE, payload : {...newPost, ...data} });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

// Update the post by an id
export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    // Update the post by the id with update details
    await api.updatePost(id, updatedPost);
    dispatch({ type : UPDATE, payload : updatedPost });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

// Delete the post by an id
export const deletePost = (id) => async (dispatch) => {
  try {
    // Delete the post document by the id
    await api.deletePost(id);
    dispatch({ type : DELETE, payload : { _id: id } });
  } catch (error) {
    console.log(error);
    console.log(error?.response);
  }
}

// Like/unlike the post by an id
export const likePost = (id) => async (dispatch) => {
  try {
    // Add/remove the like from the post and fetch the new list of likes
    const { data } = await api.likePost(id);
    dispatch({ type : LIKE, payload : { _id: id, likes: data} });
  } catch (error) {
    console.log(error?.response);
  }
}
