import React, { useState, useEffect } from "react"; // Correctly import useState and useEffect
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";

function App() {
  // Declare state variables using useState hook
  const [users, setUsers] = useState([]);  // For storing users
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error state

  // Define the function to fetch users using Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user');
      setUsers(response.data); // Set the users
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('There was an error fetching users'); // Set error message if request fails
      setLoading(false);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
        </Routes>
      </Router>

      {/* You can optionally display the users here, loading message, or errors */}
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
