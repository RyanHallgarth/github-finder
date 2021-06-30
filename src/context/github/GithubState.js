/* All state goes in here */

import React, { useReducer } from "react";
import axios from "axios";
//githubContext initializes context
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
//Import types from types.js
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

/* Set initial state; this will be available to all components.
  GithubState will include all of our actions (from /types) */
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  /* We call an action, the action makes a request to github, we get a response
    and we dispatch a 'type' back to our reducer.
    We need to use the useReducer hook here.
    */
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Clear users
  /* users state array is set to empty, which clears search results. */
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set Loading
  //Dispatch an object with 'type', we catch/handle this in githubReducer
  const setLoading = () => dispatch({ type: SET_LOADING });

  /* We're making this state accessible to entire app using
    <GithubContext.Provider>
    
    We pass a value prop in, which we pass in anything we want
    available to the entire app.
    
    {props.children}...?.
    */

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
