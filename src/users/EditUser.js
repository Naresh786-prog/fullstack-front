import React, { useEffect, useState, useCallback } from 'react'; // Import necessary hooks from React
import axios from 'axios'; // Import axios for making HTTP requests
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import React Router hooks for navigation and accessing URL params

export default function EditUser() {
  let navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const { id } = useParams(); // useParams hook to extract the user ID from the URL

  // State to hold the user data
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  // Destructure the user object for easier access to properties
  const { name, username, email } = user;

  // Function to update the state as the user types into the input fields
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Memoize loadUser function to prevent unnecessary re-renders (optimization)
  const loadUser = useCallback(async () => {
    // Fetch the user data from the backend based on the user ID
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data); // Set the user data in the state once it's fetched
  }, [id]); // The function depends on the `id` from the URL

  // useEffect hook to fetch user data when the component mounts or when `id` changes
  useEffect(() => {
    loadUser(); // Call the memoized loadUser function to fetch user data
  }, [id, loadUser]); // Re-run this effect if either `id` or `loadUser` changes

  // Function to handle form submission (update user data)
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a PUT request to the backend to update the user with the provided data
    await axios.put(`http://localhost:8080/users/${id}`, user);
    navigate("/"); // Navigate to the homepage after successful update
  };

  return (
    <div className="Container">
      <div className="row">
        {/* Container for the form */}
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3 className="text-center mb-4">Edit User</h3> {/* Heading for the edit form */}
          {/* Form to edit the user information */}
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Input field for Name */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Name"
                name="name" // Name of the input, matches the state property
                value={name} // Set the value from state to ensure the input is controlled
                onChange={(e) => onInputChange(e)} // Update state on input change
              />
            </div>

            {/* Input field for Username */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Username"
                name="username" // Name of the input, matches the state property
                value={username} // Set the value from state to ensure the input is controlled
                onChange={(e) => onInputChange(e)} // Update state on input change
              />
            </div>

            {/* Input field for Email */}
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your E-mail Address"
                name="email" // Name of the input, matches the state property
                value={email} // Set the value from state to ensure the input is controlled
                onChange={(e) => onInputChange(e)} // Update state on input change
              />
            </div>

            {/* Submit button for the form */}
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>

            {/* Cancel button that navigates the user back to the homepage */}
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
