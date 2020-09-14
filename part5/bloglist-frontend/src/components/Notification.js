import React from "react";

const Notification = ({ errorState, message }) => {
  if (message === null) {
    return null
  } else if (errorState === true){ 
    return (
      <div className="errorMessage">
        {message}
      </div>
    )
  } else if (errorState === false){
    return (
      <div className="successMessage">
        {message}
      </div>
    )
  }
}

export default Notification
