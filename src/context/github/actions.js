import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

// Search Users function/logic
/*User input 'text' is passed into searchUsers.  The state of loading is changed to true.
    res is declared to hold the http response. An asynchronous call to the GitHub API uses
    'text' in the query string along with environment variables. The response is an object.  I target
    the relevant data, 'items', and pass it into setUsers. This changes the users state from an empty
    array to an array of objects. Loading is set back to false to hide loading spinner. 
  */
export const searchUsers = async (text) => {
  const res = await github.get(`/search/users?q=${text}`);
  return res.data.items;
};

export const getUserAndRepos = async (username) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}?`),
    github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
  ]);
  return { user: user.data, repos: repos.data };
};
