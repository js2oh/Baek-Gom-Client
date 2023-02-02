import { FETCH_ALL, FETCH_BY_ID, FETCH_BY_SEARCH, FETCH_POST_DETAILS, CREATE, UPDATE, LIKE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

// Reducer for Posts
const posts = (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      };
    case FETCH_BY_ID:
      return {
        ...state,
        post: action.payload,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      };
    case FETCH_POST_DETAILS:
      return {
        ...state,
        post: action.payload.post,
        recommends: action.payload.recommends,
      };
    // Add the new post to the previous list of posts
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload]}
    // Replace the post that is being updated
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
      };
    // Replace the likes field of the post that is being updated
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? {...post, likes: action.payload.likes} : post),
      };
    // Filter out the post that is being deleted
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default posts;
