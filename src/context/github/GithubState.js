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
  /* 
  getUser() fires when userItem is clicked. The login username is passed into the function. Loading
  is set to true to show spinner component.  An asynchronous call is made to the GitHub single user endpoint.
  An object holding single user data is returned and stored in res. The single user object data is passed
  into 'setUser()' which populates the empty 'user' object. loading is set to false.
  */
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("Individual user...");
    console.log(res.data);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //Get Repos
  /* 
  username is passed into getUserRepos(), which fires when userItem button is clicked. Loading is set to true.
  An asynchronous API call is made using the username is the query string.  res holds the API response.  res is 
  passed into setRepos(), which changes the repos state from empty to holding an array of repository data.
 */
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

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
