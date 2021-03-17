import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
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
      setAlert("Must enter text to search!", "light");
      //Otherwise, pass current state of text to searchUsers()
    } else {
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
      {/*If showClear returns true, display button that will clear search results
        on click. */}
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
