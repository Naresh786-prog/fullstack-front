import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

   // Navbar container with Bootstrap classes for styling
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
       
        <Link className="navbar-brand" to="/">
          Students Information System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto">
            {/* Navigation Button */}
            <Link className="btn btn-outline-light" to="/adduser">
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
