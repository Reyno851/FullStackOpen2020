import React from 'react';

const Message = ({ message, errorState }) => {
    if (message === null) {
      return null
    } else if (errorState === true){ // Return messages with different class names based on error state to alter css
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

  export default Message;