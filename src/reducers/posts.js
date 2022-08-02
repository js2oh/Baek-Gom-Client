import { FETCH_ALL, FETCH_BY_ID, FETCH_BY_SEARCH, FETCH_POST_DETAILS, CREATE, UPDATE, LIKE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

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
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload]}
    case UPDATE:
      return { 
        ...state, 
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? {...post, likes: action.payload.likes} : post),
      };
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