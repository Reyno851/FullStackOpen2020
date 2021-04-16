import React from "react";

const Notification = ({ errorState, notification }) => {
  if (notification === null) {
    return null
  } else if (errorState === true){ 
    return (
      <div className="errorMessage">
        {notification}
      </div>
    )
  } else if (errorState === false){
    return (
      <div className="successMessage">
        {notification}
      </div>
    )
  }
}

export default Notification
