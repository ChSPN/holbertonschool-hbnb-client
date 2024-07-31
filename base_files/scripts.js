// Add an event listener for the form submission:
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          try {
              await loginUser(email, password);
          } catch (error) {
              console.error('Login error:', error);
              alert('Login failed: ' + error.message);
          }
      });
  }
});
//Make the AJAX request to the API:
async function loginUser(email, password) {
  try {
      const response = await fetch('https://your-api-url/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });
//Handle the API response and store the token in a cookie:
      if (response.ok) {
          const data = await response.json();
          document.cookie = `token=${data.access_token}; path=/`;
          window.location.href = 'index.html';
      } else {
          alert('Login failed: ' + response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while trying to log in. Please try again.');
  }
}
