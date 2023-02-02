import { SET, CLEAR } from '../constants/actionTypes';

// Current Id Reducer (for editing the post and the form data)
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
