# Students DB

## Description
    
Write a mysql database table generation and insert scripts for students, classes, and assignments. (~60 minutes)

## Instructions

- For each record, we need to track when they were created and updated via SQL.
- You cannot use mysqldump, phpmyadmin, or similar for this exercise.
- All of the sql for this should be contained in one file named "studentsdb.sql". Include statements to create tables, drop tables, and insert records.
- Write two select statements:
    1) Show all of the lessons User 1 is taking
    2) Show all users in a class during Period 5
 
## Data

### Classes

    Class 1: 
        name = Math
        period = Period 2
    Class 2:
        name = English
        period = Period 4
    Class 3:
        name = Science
        period = Period 5
    
### Lessons

    Lesson 1:
        name = Intro
    Lesson 2:
        name = Geometry
    Lesson 3:
        name = Physics
    Lesson 4:
        name = British Literature
    Lesson 5: 
        name = Algebra
        
### Users

    User 1:
        first name: Kevin
        last name: Parker
    User 2: 
        first name: Steven
        last name: Tray
    User 3:
        first name: Brittany
        last name: Chase
    User 4:
        first name: Jessica
        last name: Smith

## Data Relationships

    Class 1 is made up of Lesson 1, Lesson 2, and Lesson 5.
    Class 2 is made up of Lesson 1, and Lesson 4.
    Class 3 is made up of Lesson 1, Lesson 5, and Lesson 3.
    User 1 is taking Class 2 and Class 3.
    User 2 is taking Class 1 and Class 3.
    User 3 is taking Class 1, Class 2, and Class 3.
    User 4 is taking Class 1 and Class 2.


