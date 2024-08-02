# Holberton School - HBNB Client

## Description

This project implements the client-side functionalities for the HBNB web application. It includes the following features:
- User login and authentication using JWT tokens.
- Displaying a list of places fetched from the API.
- Viewing detailed information for a selected place.
- Adding reviews for places if the user is authenticated.
- Client-side filtering of places based on country selection.

## Features

- **Login Functionality**: Users can log in using their email and password. The application uses JWT tokens for session management.
- **Place Listings**: Fetches and displays a list of places from the API, including their details such as name, description, location, and price.
- **Place Details**: Displays detailed information about a specific place, including an option to add a review if the user is authenticated.
- **Client-Side Filtering**: Allows users to filter places based on the selected country without reloading the page.

## Requirements

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- JWT for authentication
- Backend API for places and authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChSPN/holbertonschool-hbnb-client.git
   cd holbertonschool-hbnb-client
2. Open the project in your preferred code editor.
3. Ensure that the backend server is running and accessible.

## Usage
### Login Functionality
1. Open login.html in your browser.
2. Enter your email and password.
3. If the login is successful, you will be redirected to the main page (index.html).

### Viewing Places
1. Open index.html in your browser.
2. The page will automatically fetch and display a list of places from the API.

### Viewing Place Details
1. Click the "View Details" button on any place card in index.html.
2. The page will redirect to place.html and display detailed information about the selected place.

### Adding Reviews
1. Open place.html for a specific place.
2. If you are logged in, you will see a form to add a review.

## Development
### Check User Authentication
1. On page load, check if the user is authenticated by verifying the presence of the JWT token in cookies.
2. If the token is not found, show the login link.
3. If the token is found, hide the login link and fetch places data.

### Fetch Places Data
1. Use the Fetch API to send a GET request to the endpoint that returns the list of places.
2. Include the token in the Authorization header of your request.

### Populate Places List
1. Dynamically create HTML elements to display each place’s information (e.g., name, description, location).
2. Append these elements to the #places-list section.

### Implement Client-Side Filtering
1. Add an event listener to the country filter dropdown.
2. Filter the displayed places based on the selected country without reloading the page.

## Testing
1. Test the login functionality with valid and invalid credentials to ensure it works as expected.
2. Verify that the JWT token is stored in the cookie after a successful login.
3. Ensure that the user is redirected to the main page after login.
4. Test the functionality by logging in and viewing the list of places.
5. Verify that the client-side filter works as expected.
6. Ensure the login link appears only when the user is not authenticated.

## Author
Charlène SCOMPARIN / [GitHub Repository](https://github.com/ChSPN/holbertonschool-hbnb-client)
