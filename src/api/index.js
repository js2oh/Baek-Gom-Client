import axios from 'axios';

// Create a new instance of axios using a baseURL
const API = axios.create({ baseURL: 'https://baek-gom-server.onrender.com/' });

// Add a request interceptor to attach the token stored in-memory before sending the request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// Axios request functions
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?page=${searchQuery.page}&search=${searchQuery.search || ''}&tags=${searchQuery.tags || ''}`);
export const fetchPostDetails = (id) => API.get(`/posts/${id}`);
export const submitPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => axios.post('/user/signin', formData);
export const signup = (formData) => axios.post('/user/signup', formData);
