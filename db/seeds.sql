INSERT INTO departments (dept_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Service");

INSERT INTO roles (department_id, salary, title)
VALUES  (2, 160000, "Account Manager"),
        (2, 125000, "Accountant"),
        (5, 80000, "Customer Service"),
        (3, 190000, "Lawyer"),
        (3, 250000, "Legal Team Lead"),
        (4, 100000, "Sales Manager"),
        (4, 80000, "Salesperson"),
        (1, 150000, "Lead Engineer"),
        (1, 120000, "Software Engineer");
        
        
        
        
        

INSERT INTO employees (role_id, manager_id, first_name, last_name)
VALUES (1, NULL, "Katherine", 'Barry'),
       (9, 4, "Cassandra", "Cain"),
       (6, 3, "Lee", "Child"),
       (7, 3, "Jon", "Duckett"),
       (3, NULL, "John", "Grisham"),
       (5, NULL, "Ibrham", "Kendi"),
       (6, 3, "Barbara", "Kingsolver"),
       (2, 1, "Martin", "Lawrence"),
       (4, 2, "Douglas", "Preston"),
       (4, 2, "Anna", "Quindlen"),
       (2, 1, "Jack", 'Reacher'),
       (8, NULL, "Ellen", "Ripley"),
       (9, 4, "Bruce", "Wayne");