const axios = require('axios');
const initialInquire = require('../index.js');

function getDepartments(server) {
  axios
    .get('http://localhost:3003/api/departments')
    .then(() => {
      initialInquire.initialInquire(server);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getRoles(server) {
  axios
    .get('http://localhost:3003/api/roles')
    .then(() => {
      initialInquire.initialInquire(server);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getEmployees(server) {
  axios
    .get('http://localhost:3003/api/employees')
    .then(() => {
      initialInquire.initialInquire(server);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getDepartments, getRoles, getEmployees };
