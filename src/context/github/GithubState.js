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

//Set initial state; this will be available to all components.  No prop drilling?
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users function/logic
  /*User input 'text' is passed into searchUsers.  The state of loading is changed to true.
    res is declared to hold the http response. An asynchronous call to the GitHub API uses
    'text' in the query string along with environment variables. The response is an object.  I target
    the relevant data, 'items', and pass it into setUsers. This changes the users state from an empty
    array to an array of objects. Loading is set back to false to hide loading spinner. 
  */
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Dispatch to githubReducer, type: action, payload: data from http response
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get User

  //Get Repos

  //Clear users

  //Set Loading
  //Dispatch an object with 'type', we catch/handle this in githubReducer
  const setLoading = () => dispatch({ type: SET_LOADING });

  /* We're making this state accessible to entire app */
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
