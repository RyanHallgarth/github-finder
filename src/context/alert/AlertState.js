/* All state goes in here */

import React, { useReducer } from "react";
//githubContext initializes context
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
//Import types from types.js
import { SET_ALERT, REMOVE_ALERT } from "../types";

//Set initial state; this will be available to all components.  No prop drilling?
const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set Alert
  /*
   setAlert() is fired when the user clicks search with an empty text input field.
   'msg' and 'type' are defined in the onSubmit event handler in the Search.js component.
   The alert clears after 4 seconds.
  */
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 4000);
  };

  /* We're making this state accessible to entire app */
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
