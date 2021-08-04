const inquire = require('inquirer');
const { getDepartments, getRoles, getEmployees } = require('./lib/viewing.js');
const { postDepartment, postRole, postEmployee } = require('./lib/adding.js');
const { updateEmployeeRole } = require('./lib/updating.js');

module.exports.initialInquire = function (server) {
  return inquire
    .prompt([
      {
        type: 'list',
        name: 'optionChoice',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add A Department',
          'Add A Role',
          'Add An Employee',
          'Update An Employee Role',
          'Exit',
        ],
      },
    ])
    .then((result) => {
      switch (result.optionChoice) {
        case 'View All Departments':
          getDepartments(server);
          break;
        case 'View All Roles':
          getRoles(server);
          break;
        case 'View All Employees':
          getEmployees(server);
          break;
        case 'Add A Department':
          postDepartment(server);
          break;
        case 'Add A Role':
          postRole(server);
          break;
        case 'Add An Employee':
          postEmployee(server);
          break;
        case 'Update An Employee Role':
          updateEmployeeRole(server);
          break;
        case 'Exit':
          server.close();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
