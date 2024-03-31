import api from './API_Client_Mock.js';

// Add event listeners
const createButton = document.querySelector('.createContainer button');
const loginButton = document.querySelector('.loginContainer button');

createButton.addEventListener('click', () => {
  const name = document.querySelector('.createContainer .nameIn').value;
  const email = document.querySelector('.createContainer .emailIn').value;
  const password = document.querySelector('.createContainer .passIn').value;

  const newUser = {
    name: name,
    email: email,
    password: password
  };

  api.createUser(newUser)
    .then(response => {
      console.log('User created successfully:', response);
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
});

loginButton.addEventListener('click', () => {
  const email = document.querySelector('.loginContainer .emailIn').value;
  const password = document.querySelector('.loginContainer .passIn').value;

  const credentials = {
    email: email,
    password: password
  };

  api.login(credentials)
    .then(response => {
      console.log('User logged in successfully:', response);
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
});
