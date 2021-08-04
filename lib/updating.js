const axios = require('axios');
const initialInquire = require('../index.js');
const inquire = require('inquirer');
const db = require('../db/connection.js');

function updateEmployeeRole(server) {
  return inquire
    .prompt([
      {
        type: 'confirm',
        message: 'Are you sure? ',
        name: 'confirm',
        default: true,
      },
      {
        type: 'list',
        message: 'Which employee would you like to update: ',
        name: 'employee',
        choices: getAllEmployees(),
      },
      {
        type: 'list',
        message: 'Which role would you like to update to: ',
        name: 'role',
        choices: getRolesNames(),
      },
    ])
    .then((results) => {
      let pass1 = false;
      let pass2 = false;
      let employeeName = results.employee.split(' ');

      db.query(
        `SELECT id FROM roles WHERE name='${results.role}'`,
        (err, row) => {
          if (err) {
            console.log(err);
            return;
          }
          results.role = row[0].id;
          pass1 = true;
        }
      );

      setTimeout(() => {
        db.query(
          `SELECT id FROM employees WHERE first_name='${employeeName[0]}' AND last_name='${employeeName[1]}'`,
          (err, row) => {
            if (err) {
              console.log(err);
              return;
            }
            results.employee = row[0].id;
            pass2 = true;
          }
        );
      }, 150);

      let interval = setInterval(() => {
        if (pass1 && pass2) {
          clearInterval(interval);
          axios.put('http://localhost:3003/api/employee', {
            role_id: results.role,
            id: results.employee,
          });
          initialInquire.initialInquire(server);
        }
      }, 50);
    });
}

function getAllEmployees() {
  let row = [];
  let employeeNames = [];
  db.query(
    `SELECT CONCAT(first_name, ' ', last_name) as name FROM employees`,
    (err, rows) => {
      if (err) {
        return;
      }
      row = rows;
      row.forEach((name) => {
        if (employeeNames.indexOf(name.name) === -1)
          employeeNames.push(name.name);
      });
    }
  );

  return employeeNames;
}

function getRolesNames() {
  let row = [];
  let roleNames = [];
  db.query('SELECT name FROM roles', (err, rows) => {
    if (err) {
      return;
    }
    row = rows;
    row.forEach((name) => {
      roleNames.push(name.name);
    });
  });

  return roleNames;
}

module.exports = { updateEmployeeRole };
