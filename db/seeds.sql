INSERT INTO department (name)
VALUES
    ('Manor'),
    ('Zilker'),
    ('Barton');


INSERT INTO roles (name, salary, department_id)
VALUES
    ('Swimmer', 750, 1),
    ('Yoga Instructor', 100000, 2),
    ('Juggler', 5000000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Hart', 'Crane', 3),
    ('Rhoda', 'Broughton', 1, 2),
    ('Arnold', 'Bennett', 1, 2),
    ('Algernon', 'Blackwood', 2, 3),
    ('Anthony', 'Trollope', 1, 6),
    ('Wilkie', 'Collins', 2, 3),
    ('Elizabeth', 'Gaskell', 1, 5),
    ('Vitorio', 'DeSica', 2, 3),
    ('George', 'Sand', 1, 5),
    ('Vernon', 'Lee', 1, 6),
    ('Arthur', 'Machen', 1, 5),
    ('Harriet', 'Martineau', 1, 2),
    ('George', 'Meredith', 1, 5),
    ('Frederick', 'Marryat', 1, 2),
    ('Eliza', 'Parsons', 1, 27),
    ('Charlotte', 'Yonge', 1, 27),
    ('Anne', 'Radcliffe', 2, 3),
    ('Margaret', 'Oliphant', 1, 5),
    ('Horace', 'Walpole', 1, 27),
    ('William', 'Bedford', 1, 26),
    ('Charles', 'Brown', 1, 26),
    ('Susan', 'Hill', 1, 24),
    ('Sydney', 'Owenson', 2, 3),
    ('Matthew', 'Lewis', 1, 26),
    ('Hubert', 'Crackanthorpe', 1, 24),
    ('William', 'Carleton', 2, 3),
    ('Gerald', 'Griffin', 2, 3); 