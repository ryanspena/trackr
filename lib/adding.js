const axios = require('axios');
const initialInquire = require('../index.js');
const inquire = require('inquirer');
const db = require('../db/connection.js');

function postDepartment(server) {
  return inquire
    .prompt([
      {
        type: 'input',
        message: 'Enter the new department name: ',
        name: 'department_name',
        validate: (input) => {
          if (!input) return false;
          return true;
        },
      },
    ])
    .then((res) => {
      axios.post('http://localhost:3003/api/department', {
        name: res.department_name,
      });
      initialInquire.initialInquire(server);
    })
    .catch((err) => {
      console.log(err);
    });
}

function postRole(server) {
  const validateNumbers = (moreValidationChecks) => ({
    validate: (input) => {
      if (input === '')
        return 'Please provide a valid number greater then 0 and be unique';

      return moreValidationChecks ? moreValidationChecks(input) : true;
    },
    filter: (input) => {
      // clear the invalid input
      return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input);
    },
  });
  return inquire
    .prompt([
      {
        type: 'input',
        message: 'Enter the name of the new role: ',
        name: 'name',
        validate: (input) => {
          if (!input) return false;
          return true;
        },
      },
      {
        type: 'number',
        message: 'Enter this roles salary',
        name: 'salary',
        ...validateNumbers(),
      },
      {
        type: 'list',
        message: 'What department does this role belong to: ',
        name: 'department',
        choices: getDepartmentNames(),
      },
    ])
    .then((results) => {
      let dummy = db.query(
        `SELECT id FROM departments WHERE name="${results.department}"`,
        (err, row) => {
          if (err) {
            console.log(err);
            return;
          }
          results.department = row[0].id;
          axios.post('http://localhost:3003/api/role', {
            name: results.name,
            salary: results.salary,
            department_id: results.department,
          });
          initialInquire.initialInquire(server);
        }
      );
    });
}

function postEmployee(server) {
  return inquire
    .prompt([
      {
        type: 'input',
        message: 'Enter the first name of the employee: ',
        name: 'first_name',
        validate: (input) => {
          if (!input) return false;
          return true;
        },
      },
      {
        type: 'input',
        message: 'Enter the last name of the employee: ',
        name: 'last_name',
        validate: (input) => {
          if (!input) return false;
          return true;
        },
      },
      {
        type: 'list',
        message: 'What is this employees role: ',
        name: 'role',
        choices: getRolesNames(),
      },
      {
        type: 'list',
        message: 'Does this employee have a manager: ',
        name: 'manager',
        choices: getManagersNames(),
      },
    ])
    .then((results) => {
      let pass1 = false;
      let pass2 = false;
      let managerName;
      if (results.manager != 'NONE') managerName = results.manager.split(' ');

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
        if (results.manager != 'NONE') {
          db.query(
            `SELECT id FROM employees WHERE first_name='${managerName[0]}' AND last_name='${managerName[1]}'`,
            (err, row) => {
              if (err) {
                console.log(err);
                return;
              }
              results.manager = row[0].id;
              pass2 = true;
            }
          );
        } else {
          results.manager = null;
          pass2 = true;
        }
      }, 100);
      var int = setInterval(() => {
        if (pass1 && pass2) {
          clearInterval(int);
          axios.post('http://localhost:3003/api/employee', {
            first_name: results.first_name,
            last_name: results.last_name,
            role_id: results.role,
            manager_id: results.manager,
          });
          initialInquire.initialInquire(server);
        }
      }, 50);
    });
}

function getManagersNames() {
  let row = [];
  let managerNames = ['NONE'];
  db.query(
    'SELECT CONCAT(managers.first_name, " ", managers.last_name) AS managers FROM employees LEFT JOIN employees managers ON managers.id = employees.manager_id',
    (err, rows) => {
      if (err) {
        return;
      }
      row = rows;
      row.forEach((name) => {
        if (managerNames.indexOf(name.managers) === -1 && name.managers)
          managerNames.push(name.managers);
      });
    }
  );

  return managerNames;
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

function getDepartmentNames() {
  let row = [];
  let departmentNames = [];
  db.query('SELECT name FROM departments', (err, rows) => {
    if (err) {
      return;
    }
    row = rows;
    row.forEach((name) => {
      departmentNames.push(name.name);
    });
  });

  return departmentNames;
}

module.exports = { postDepartment, postRole, postEmployee };
