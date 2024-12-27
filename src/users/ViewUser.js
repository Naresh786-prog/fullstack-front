import axios from "axios"; // Import axios for making HTTP requests
import React, { useEffect, useState } from "react"; // Import React and hooks
import { Link, useParams } from "react-router-dom"; // Import Link for navigation and useParams to extract parameters from the URL

// Define the viewUser component to display user details
export default function viewUser() {
    // State to store user details
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });

    // Extract user ID from the URL parameters using useParams
    const { id } = useParams();

    // useEffect hook to load user data when the component mounts
    useEffect(() => {
        loadUser(); // Call the function to fetch user data from the backend
    }, []); // Empty dependency array ensures this runs once after the first render

    // Function to load user data from the backend
    const loadUser = async () => {
        // Make a POST request to fetch the user data by ID from the backend
        const result = await axios.post(`http://localhost:8080/user/${id}`);
        setUser(result.data); // Update state with the fetched user data
    };

    return (
        <div className="Container">
            <div className="row">
                {/* Container for the user details display */}
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className="text-center mb-4">User Details</h3> {/* Title of the page */}

                    {/* Card to display the user's information */}
                    <div className="card">
                        <div className="card-header">
                            {/* Display the user ID */}
                            Details of user ID: {user.id} {/* Will display the user ID */}
                            <ul className="list-group list-group-flush">
                                {/* Display user Name */}
                                <li className="list-group-item">
                                    <b>Name :</b> {user.name}
                                </li>

                                {/* Display user Username */}
                                <li className="list-group-item">
                                    <b>Username :</b> {user.username}
                                </li>

                                {/* Display user Email */}
                                <li className="list-group-item">
                                    <b>Email :</b> {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Back to Home button, navigates the user to the homepage */}
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
