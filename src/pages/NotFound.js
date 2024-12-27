import React from "react"; // Import React library to use JSX and React features

// Define the NotFound functional component
function NotFound() {  
  return (
    // Wrapper div with some margin-top (mt-5) from Bootstrap for spacing
    <div className="container mt-5">
      
      {/* Display a heading for the 404 error page */}
      <h1>404 - Page Not Found</h1> 

      {/* A short message explaining the error */}
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
}

// Export the NotFound component for use in other parts of the app
export default NotFound;
