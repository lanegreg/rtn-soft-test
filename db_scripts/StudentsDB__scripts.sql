
--
-- ** create 'Students' database here **
--
create database if not exists Students default character set latin1 ;

use Students ;


--
-- ** begin table creations here **
--
create table if not exists Classes (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar (40) NOT NULL,
  period varchar (40) NOT NULL,
  created_on datetime NOT NULL DEFAULT now(),
  updated_on datetime NOT NULL DEFAULT now()  ON UPDATE now()
) engine=InnoDB ;

create table if not exists Lessons ( 
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar (40) NOT NULL,
  created_on datetime NOT NULL DEFAULT now(),
  updated_on datetime NOT NULL DEFAULT now()  ON UPDATE now()
) engine=InnoDB ;

create table if not exists Users ( 
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar (40) NOT NULL,
  last_name varchar (40) NOT NULL,
  created_on datetime NOT NULL DEFAULT now(),
  updated_on datetime NOT NULL DEFAULT now()  ON UPDATE now()
) engine=InnoDB ;

create table if not exists ClassLessons ( 
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  class_id int NOT NULL,
  lesson_id int NOT NULL,
  created_on datetime NOT NULL DEFAULT now(),
  updated_on datetime NOT NULL DEFAULT now()  ON UPDATE now()
) engine=InnoDB ;

create table if not exists UserClasses ( 
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  class_id int NOT NULL,
  created_on datetime NOT NULL DEFAULT now(),
  updated_on datetime NOT NULL DEFAULT now()  ON UPDATE now()
) engine=InnoDB ;


--
-- ** begin table inserts here **
--
insert Classes ( id, `name`, period )
select 1, 'Math', 'Period 2' union all
select 2, 'English', 'Period 4' union all
select 3, 'Science', 'Period 5' 
;

insert Lessons ( id, `name` )
select 1, 'Intro' union all
select 2, 'Geometry' union all
select 3, 'Physics' union all
select 4, 'British Literature' union all
select 5, 'Algebra' 
;

insert Users ( id, first_name, last_name )
select 1, 'Kevin', 'Parker' union all
select 2, 'Steven', 'Tray' union all
select 3, 'Brittany', 'Chase' union all
select 4, 'Jessica', 'Smith' 
;

insert ClassLessons ( class_id, lesson_id )
select 1, 1 union all
select 1, 2 union all
select 1, 5 union all

select 2, 1 union all
select 2, 4 union all

select 3, 1 union all
select 3, 3 union all
select 3, 5 
;

insert UserClasses ( user_id, class_id )
select 1, 2 union all
select 1, 3 union all

select 2, 1 union all
select 2, 3 union all

select 3, 1 union all
select 3, 2 union all
select 3, 3 union all

select 4, 1 union all
select 4, 2
;


--
-- ** Show all of the lessons User 1 is taking **
--
select distinct l.`name` as '- Lesson User 1 is Taking -'
from Users as u
left join UserClasses as uc on uc.user_id = u.id
left join ClassLessons as cl on cl.class_id = uc.class_id
left join Lessons as l on l.id = cl.lesson_id
where u.first_name = 'Kevin' and u.last_name = 'Parker'
;


--
-- ** Show all users in a class during Period 5 **
--
select concat(u.first_name, ' ', u.last_name) as '- Users in Period 5 -'
from Classes as  c
left join UserClasses as uc on uc.class_id = c.id
left join Users as u on u.id = uc.user_id
where c.period = 'Period 5'
;



-- drop database if exists Students
