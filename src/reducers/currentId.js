import { SET, CLEAR } from '../constants/actionTypes';

const currentId = (state=null, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case CLEAR:
      return null;
    default:
      return state;
  }
};

export default currentId;