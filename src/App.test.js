import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock components if necessary for simpler testing
jest.mock('./layout/Navbar', () => () => <div>Navbar Component</div>);
jest.mock('./pages/Home', () => () => <div>Welcome to Home Page</div>);
jest.mock('./users/AddUser', () => () => <div>Add User Page</div>);
jest.mock('./pages/NotFound', () => () => <div>Page Not Found</div>);

test('renders Home page by default', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if the Home component is rendered by default
  const homeElement = screen.getByText(/Welcome to Home Page/i); // Customize based on your Home page content
  expect(homeElement).toBeInTheDocument();
});

test('navigates to AddUser page', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Assuming there's a link or button that navigates to "/adduser"
  const addUserLink = screen.getByText(/Add User Page/i); // You can customize the text based on your AddUser component content
  fireEvent.click(addUserLink);

  // Check if AddUser component is rendered
  const addUserElement = screen.getByText(/Add User Page/i); // Customize based on your AddUser content
  expect(addUserElement).toBeInTheDocument();
});

test('renders NotFound for invalid route', () => {
  // Simulate a bad route by pushing a non-existent URL
  window.history.pushState({}, 'Test page', '/non-existent-route');
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if NotFound component is rendered for an invalid route
  const notFoundElement = screen.getByText(/Page Not Found/i); // Customize based on your NotFound component content
  expect(notFoundElement).toBeInTheDocument();
});
