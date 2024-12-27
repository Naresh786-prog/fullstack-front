import React, { useState, useEffect } from 'react'; // Import React hooks (useState and useEffect)
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link, useParams } from 'react-router-dom'; // Import Link for navigation and useParams to get dynamic route parameters

export default function Home() {
  // useState hook to store the users list from the API response
  const [users, setUsers] = useState([]); // Initialize users state as an empty array

  // useParams hook to access dynamic route parameters (in this case, 'id')
  const { id } = useParams();

  // useEffect hook to load users when the component mounts or when 'id' changes
  useEffect(() => {
    loadUsers(); // Fetch users when the component is mounted or 'id' changes
  }, [id]); // Dependency array with 'id' ensures the effect runs when 'id' changes

  // Function to load users from the backend API
  const loadUsers = async () => {
    // Make a GET request to fetch users
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data); // Set the response data to the users state
  };

  // Function to delete a user by id
  const deleteUser = async (id) => {
    // Make a DELETE request to remove the user from the backend
    await axios.delete(`http://localhost:8080/users/${id}`);
    loadUsers(); // Reload users after deletion
  };

  return (
    // Main container for the page
    <div className="container">
      <div className="py-4">
        {/* Table to display the list of users */}
        <table className="table border shadow">
          {/* Table header */}
          <thead>
            <tr>
              <th scope="col">#</th> {/* Column for index number */}
              <th scope="col">Name</th> {/* Column for user name */}
              <th scope="col">Username</th> {/* Column for user username */}
              <th scope="col">Email</th> {/* Column for user email */}
              <th scope="col">Action</th> {/* Column for action buttons */}
            </tr>
          </thead>
          {/* Table body where users are displayed */}
          <tbody>
            {
              // Map through users and display each user as a table row
              users.map((user, index) => (
                // Each row has a unique 'key' prop using user.id
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th> {/* Display the row number (index + 1) */}
                  <td>{user.firstName}</td> {/* Display user's first name */}
                  <td>{user.lastName}</td> {/* Display user's last name */}
                  <td>{user.email}</td> {/* Display user's email */}
                  <td>
                    {/* View button to see details of the user (currently without functionality) */}
                    <button className="btn btn-primary mx-2">View</button>

                    {/* Edit button linking to the edit user page with user ID */}
                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                      Edit
                    </Link>

                    {/* Delete button that calls the deleteUser function with the user's ID */}
                    <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
