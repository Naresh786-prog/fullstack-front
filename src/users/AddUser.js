import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState } from 'react'; // Import React and useState hook
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for programmatic navigation

// Define the AddUser functional component
export default function AddUser() {

    let navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

    // Initialize the state for the user with default values for name, username, and email
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });

    // Destructure the user object to easily access name, username, and email
    const { name, username, email } = user;

    // Function to handle input changes and update state dynamically
    const onInputChange = (e) => {
        // Update the state with the value of the corresponding field
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Make a POST request to the server with the user data
        await axios.post("http://localhost:8080/user", user); 
        // Navigate to the home page after successful submission
        navigate("/");  
    };

    return (
        <div className="Container"> {/* Wrapper div for the form container */}
            <div className="row"> {/* Bootstrap row for layout */}
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"> {/* Form container with styling */}
                    <h3 className="text-center mb-4">Register User</h3> {/* Title of the form */}

                    {/* Form for user input with onSubmit handler */}
                    <form onSubmit={(e) => onSubmit(e)}>
                        {/* Input field for Name */}
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label"> {/* Label for Name */}
                                Name
                            </label>
                            <input 
                                type={"text"} 
                                className="form-control" 
                                placeholder="Enter Your Name" 
                                name="name" 
                                value={name} // Bind input field value to state
                                onChange={(e) => onInputChange(e)} // Update state on input change
                            />
                        </div>

                        {/* Input field for Username */}
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label"> {/* Label for Username */}
                                Username
                            </label>
                            <input 
                                type={"text"} 
                                className="form-control" 
                                placeholder="Enter Your Username" 
                                name="username" 
                                value={username} // Bind input field value to state
                                onChange={(e) => onInputChange(e)} // Update state on input change
                            />
                        </div>

                        {/* Input field for Email */}
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label"> {/* Label for Email */}
                                E-mail
                            </label>
                            <input 
                                type={"text"} 
                                className="form-control" 
                                placeholder="Enter Your E-mail Address" 
                                name="email" 
                                value={email} // Bind input field value to state
                                onChange={(e) => onInputChange(e)} // Update state on input change
                            />
                        </div>

                        {/* Submit button to send the form data */}
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>

                        {/* Cancel button to navigate back to the home page */}
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>

                </div>
            </div>
        </div>
    );
}
