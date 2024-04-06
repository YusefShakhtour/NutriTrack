import api from './API_Client_Mock.js';

api.getCurrentUser().then(user => {
}).catch(error => {
  if (error.status === 401) {
    console.log("We are not logged in");
    document.location = './login';
  }
  else {
    console.log(`${error.status}`, error);
  }
});