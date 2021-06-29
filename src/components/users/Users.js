/* 1.) import useContext */
import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
 /* 2.) import GithubContext */
import GithubContext from "../../context/github/githubContext";

const Users = () => {
 /* 3.) initialize githubContext with the useContext hook */
  const githubContext = useContext(GithubContext);
/* 4.) Since there are two pieces of state
  we will destructure loading and users from
  githubContext */
  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
