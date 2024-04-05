import api from './API_Client_Mock.js';

// Add event listeners
const loginButton = document.querySelector('#loginButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');


const errorBox = document.querySelector('#errorBox');

loginButton.addEventListener('click', () => {
    api.login(username.value, password.value)
        .then(response => {
            console.log('User logged in successfully:', response);
            window.location.href = '/dashboard.html';
        })
        .catch(error => {
            errorBox.classList.remove('hidden');
            if(error.status === 401) { 
                errorBox.innerHTML = "Invalid username or password";    
            }
            else {
                errorBox.innerHTML = err;
              }
            
            
        });
});

