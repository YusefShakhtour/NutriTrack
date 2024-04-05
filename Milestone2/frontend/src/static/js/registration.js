import api from './API_Client_Mock.js';

// Add event listeners
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

const registerBtn = document.querySelector('.registerBtn');

registerBtn.addEventListener('click', function(e) {
    api.createUser(firstName.value, lastName.value, username.value, password.value)
        .then(response => {
            console.log('User created successfully:', response);
            window.location.href = '/login.html';
        })
        .catch(err => {
            console.log("something went wrong" + err);
        })
})