import React, { Fragment, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import User from "./components/users/User";
import About from "./components/pages/About";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /*User input 'text' is passed into searchUsers.  The state of loading is changed to true.
    res is declared to hold the http response. An asynchronous call to the GitHub API uses
    'text' in the query string along with environment variables. The response is an object.  I target
    the relevant data, 'items', and pass it into setUsers. This changes the users state from an empty
    array to an array of objects. Loading is set back to false to hide loading spinner. 
  */
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("Search Users...");
    console.log(res.data.items);
    setUsers(res.data.items);
    setLoading(false);
  };

  /* 
  getUser() fires when userItem is clicked. The login username is passed into the function. Loading
  is set to true to show spinner component.  An asynchronous call is made to the GitHub single user endpoint.
  An object holding single user data is returned and stored in res. The single user object data is passed
  into 'setUser()' which populates the empty 'user' object. loading is set to false.
  */
  const getUser = async (username) => {
    console.log(username);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("Individual user...");
    console.log(res.data);
    setUser(res.data);
    setLoading(false);
  };

  /* 
  username is passed into getUserRepos(), which fires when userItem button is clicked. Loading is set to true.
  An asynchronous API call is made using the username is the query string.  res holds the API response.  res is 
  passed into setRepos(), which changes the repos state from empty to holding an array of repository data.
 */
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  /* users state array is set to empty, which clears search results. */
  const clearUsers = () => {
    setLoading(true);
    setUsers([]);
    setLoading(false);
  };

  /*
   setAlert() is fired when the user clicks search with an empty text input field.
   'msg' and 'type' are defined in the onSubmit event handler in the Search.js component.
   The alert clears after 4 seconds.
  */
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };
  // Still need lengthy comments for router.
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path={`/user/:login`}
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
