import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

/*reducer takes in state and action. Each case is an action or 'type'.  return current state
(...state), then update changes

SEARCH_USERS --> 
...state means copy existing state, 
set users state to action.payload, 
set loading to false


SET_LOADING -->
...state means keep existing state,
set loading state to true,
**every time we call setLoading(), loading state is changed to true.

*/

const githubReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
