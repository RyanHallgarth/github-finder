//**0.) import useContext */
import React, { useState, useContext } from "react";
//**1.) import context file.
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
import { searchUsers } from "../../context/github/actions";

const Search = () => {
  //**2.) Define context with useContext */
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  /*Define state for 'text' as an empty string. setText
  is called and passed a value to change the state of 'text'.*/
  const [text, setText] = useState("");

  // Define onChange event handler to manipulate state of text
  const onChange = (e) => {
    /* 
    Initial state of text is blank.  onChange event function
    listens for change to form input field. Each keystoke triggers onChange,
    which passes changed event object into onChange. The keystroke value
    is targeted by e.target.value, passed into setText, updates current state
    character by character.
    */
    console.log(e.target.value);
    setText(e.target.value);
  };

  // Define submit event handler, pass in event.
  const onSubmit = (e) => {
    e.preventDefault();
    //If text state is empty when Search event is fired,
    if (text === "") {
      //Display Alert to user
      alertContext.setAlert("Must enter text to search!", "light");
      //Otherwise, pass current state of text to searchUsers()
    } else {
      //**3.) Make call that will update state */
      searchUsers(text);
      //and reset text state to empty string
      setText("");
    }
  };

  return (
    <div>
      {/*
            Render a form that calls onSubmit when input of type 'submit'
            is fired.
        */}
      <form onSubmit={onSubmit} className='form'>
        {/* Render text input field.  */}
        <input
          type='text'
          name='text'
          placeholder='Search Users..'
          value={text} // Setting the value to text state allows us to clear field on submit
          onChange={onChange} // Fires on each change to text input field
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {/*If users array is > 0, display button that will clear search results
        on click. */}
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
