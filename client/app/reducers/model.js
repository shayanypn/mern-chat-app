import {
  ADD_MODEL
} from '../actions';


function model(state = [], action) {
  switch (action.type) {
    case ADD_MODEL:

      return [
        ...state,
        {
          text: action.text
        }
      ];
    default:
      return state
  }
}

export default model;