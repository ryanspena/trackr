User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
Mock-Up

The following animation shows an example of the application being used from the command line:

A user accesses the employee database through the command line, viewing employee names and adding a new employee.

Getting Started

You’ll need to use the MySQL2 package (Links to an external site.) to connect to your MySQL database and perform queries, the Inquirer package (Links to an external site.) to interact with the user via the command-line, and the console.table package (Links to an external site.) to print MySQL rows to the console.

IMPORTANT
You will be committing a file that contains your database credentials. Make sure your MySQL password is not used for any other personal accounts, because it will be visible on GitHub. In upcoming lessons, you will learn how to better secure this password, or you can start researching npm packages now that could help you.
You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to “upgrade” an existing non-Promise connection to use Promises. Look into MySQL2's documentation (Links to an external site.) to make your queries asynchronous.

Design the database schema as shown in the following image:

Database schema includes tables labeled “employee,” role,” and “department.”

As the image illustrates, your schema should contain the following three tables:

Department

id: INT PRIMARY KEY

name: VARCHAR(30) to hold department name

Role

id: INT PRIMARY KEY

title: VARCHAR(30) to hold role title

salary: DECIMAL to hold role salary

department_id: INT to hold reference to department role belongs to

Employee

id: INT PRIMARY KEY

first_name: VARCHAR(30) to hold employee first name

last_name: VARCHAR(30) to hold employee last name

role_id: INT to hold reference to employee role

manager_id: INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager.

You may want to use a separate file containing functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You may also want to include a seeds.sql file to pre-populate your database. This will make the development of individual features much easier.

Bonus

See if you can add some additional functionality to your application, such as the ability to:

Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—i.e., the combined salaries of all employees in that department.

Grading Requirements

This Challenge is graded based on the following criteria:

Deliverables: 10%

Your GitHub repository containing your application code.
Walkthrough Video: 27%

A walkthrough video that demonstrates the functionality of the Employee Tracker must be submitted, and a link to the video should be included in your README file.

The walkthrough video must show all of the technical acceptance criteria being met.

The walkthrough video must demonstrate how a user would invoke the application from the command line.

The walkthrough video must demonstrate a functional menu with the options outlined in the acceptance criteria.

Technical Acceptance Criteria: 40%

Satisfies all of the preceding acceptance criteria plus the following:

Uses the Inquirer package (Links to an external site.).

Uses the MySQL2 package (Links to an external site.) to connect to a MySQL database.

Uses the console.table package (Links to an external site.) to print MySQL rows to the console.

Follows the table schema outlined in the Challenge instructions.

Repository Quality: 13%

Repository has a unique name.

Repository follows best practices for file structure and naming conventions.

Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

Repository contains multiple descriptive commit messages.

Repository contains a high-quality README with description and a link to a walkthrough video.

Application Quality 10%

The application user experience is intuitive and easy to navigate.
How to Submit the Challenge

You are required to submit BOTH of the following for review:

A walkthrough video demonstrating the functionality of the application.

The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

