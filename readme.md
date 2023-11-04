# Student CRUD

Student CRUD operation.

Minimal Application that consists of a page for detailed overview of students, a page for Adding, updating and deleting students and a page for usefull insights about students.

Features:

- Advanced Search
- Sort
- Filteration of data

## Tech Stack

- MERN - MongoDB, Express, React, Node
- HTML

## Backend

DB design

    name - only string with space
    email - unique
    birthdate - date
    enrollmentnum - only number + unique
    gender - radio
    hobbies - checkbox
    semester - dropdown
    paper 1 - number >= 100
    paper 2 - number >= 100
    paper 3 - number >= 100
    result
    comments
    createdAt

## Frontend

### Home page

Show List of students

Update and Delete functionality.

On update and Delete run validations on Frontend and backend and show alert appropriately.

Sort :
Name
Result
CreatedAt

Search :

    Name
    Email
    enrollmentnum

Filter:
Filter marks less than and more than entered
Filter date more than and less than

### Add students page

Field list -

    name - only str with space
    email - unique
    enrollmentnum - only number + unique
    gender - radio
    hobbies - checkbox
    semester - dropdown
    paper 1 - number >= 100
    paper 2 - number >= 100
    paper 3 - number >= 100

Additional validation p1 + p2 + p3 <= 300

All fields are mandatory

Post response, show alert with success / failure message

### View Insights Page

Show Highest marks in Paper 1, Paper 2, Paper 3 and Result.

Show who has highest hobbies.
