import React from "react";

/* 
    If alert is not null, display alert.  A div is created using css classNames
    variables are passed in from the Search.js component.
*/

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
