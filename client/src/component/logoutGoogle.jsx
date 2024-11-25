import React from 'react';
import { gapi } from 'gapi-script';
import "../assets/css/form.css"


function Logout({ onLogout }) {
  const handleLogout = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signOut().then(() => {
        onLogout(); // Inform the parent component to update the state
        console.log("User logged out successfully");
      });
    } else {
      console.error("Error: Auth instance is not available");
    }
  };

  return (
    <div id="signOutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
