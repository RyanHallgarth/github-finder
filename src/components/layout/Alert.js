import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

/* 
    If alert is not null, display alert.  A div is created using css classNames
    variables are passed in from the Search.js component.
*/

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
