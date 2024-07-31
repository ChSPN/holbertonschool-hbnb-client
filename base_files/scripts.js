document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await loginUser(email, password);

        if (response.ok) {
          const data = await response.json();
          // Set the cookie with SameSite=None; Secure
          document.cookie = `token=${data.access_token}; path=/; SameSite=None;`;
          window.location.href = 'index.html';
        } else {
          const errorData = await response.json();
          alert('Login failed: ' + (errorData.msg || response.statusText));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
});

async function loginUser(email, password) {
  const response = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return response;
}
// Vérifier l'authentification de l'utilisateur
document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();

  document.getElementById('country-filter').addEventListener('change', (event) => {
      filterPlaces(event.target.value);
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function checkAuthentication() {
  const token = getCookie('token');

  if (!token) {
      window.location.href = 'login.html';  // Redirect to login page
  } else {
      fetchPlaces(token);
  }
}
//Récupérer les données des lieux
async function fetchPlaces(token) {
  try {
      let response = await fetch('http://127.0.0.1:5000/places', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          const places = await response.json();
          displayPlaces(places);
          response = await fetch('http://127.0.0.1:5000/countries', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const countries = await response.json();
        const countryFilter = document.getElementById('country-filter');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countryFilter.appendChild(option);
        });
      } else {
          console.error('Failed to fetch places:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
// Afficher la liste des lieux
function displayPlaces(places) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';

  places.forEach(place => {
      const placeCard = document.createElement('div');
      placeCard.className = 'place-card';
      placeCard.setAttribute('data-country', place.country_code);
      placeCard.innerHTML = `
          <img class="place-image" src="${place.image_url == undefined ? 'images/place1.jpg' : place.image_url}" alt="${place.host_name}">
          <h3>${place.host_name}</h3>
          <p>${place.description}</p>
          <p>Location: ${place.city_name}, ${place.country_name}</p>
          <p>Price: ${place.price_per_night}</p>
          <button class="details-button" onclick="viewDetails(${place.id})">View Details</button>
      `;

      placesList.appendChild(placeCard);
  });
}
// Filtrage côté client
function filterPlaces(selectedCountry) {
  const places = document.querySelectorAll('.place-card');

  places.forEach(place => {
      const location = place.getAttribute('data-country');
      if (selectedCountry === 'All' || location === selectedCountry) {
          place.style.display = 'block';
      } else {
          place.style.display = 'none';
      }
  });
}
