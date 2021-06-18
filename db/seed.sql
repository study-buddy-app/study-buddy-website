DROP TABLE IF EXISTS tbl_subject_backpack_junction
DROP TABLE IF EXISTS tbl_backpack;
DROP TABLE IF EXISTS tbl_subject;
DROP TABLE IF EXISTS tbl_session;
DROP TABLE IF EXISTS tbl_tutor;

CREATE TABLE tbl_subject_backpack_junction (
subject_backpack_id SERIAL PRIMARY KEY,
backpack_id INT REFERENCES tbl_backpack(backpack_id),
subject_id INT REFERENCES tbl_subject(subject_id)
);

CREATE TABLE tbl_student (
  student_id SERIAL PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  age INT,
  password VARCHAR(100)
);

CREATE TABLE tbl_backpack (
  backpack_id SERIAL PRIMARY KEY,
  tutor_id INT REFERENCES tbl_tutor(tutor_id),
  student_id INT REFERENCES tbl_student(student_id),
  subject_id INT REFERENCES tbl_subject(subject_id)
  active BOOLEAN;
);

CREATE TABLE tbl_subject (
subject_id SERIAL PRIMARY KEY,
description VARCHAR(500),
subject VARCHAR(300)
);


CREATE TABLE tbl_session (
  session_id SERIAL PRIMARY KEY,
  student_id INT REFERENCES tbl_student(student_id),
  date DATE,
  tutor_id INT REFERENCES tbl_tutor(tutor_id),
  start_time VARCHAR(300),
  end_time VARCHAR(300)
);

CREATE TABLE tbl_tutor (
  tutor_id SERIAL PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  age INT,
  subjects VARCHAR[],
  password VARCHAR(100)
);

-- ALTER TABLE z
-- ADD COLUMN x VARCHAR(50);

--DELETE TABLE DATA
-- DELETE FROM tbl_provider 
-- WHERE name IS NOT NULL;

-- ALTER TABLE z
-- RENAME COLUMN x TO y;

-- UPDATE some_table
-- SET some_col = 'NEW VALUE GOES HERE!'
-- WHERE some_condition;

-- ALTER TABLE table_name
-- RENAME TO new_table_name;

-- INSERT INTO tbl_subject
-- (description, subject)
-- VALUES
-- ('Agriculture', 'AGRICULTURE'),
-- ('Architecture', 'ARCHITECTURE'),
-- ('Ethnic Studies', 'SOCIAL STUDIES'),
-- ('Aviation', 'ENGINEERING'),
-- ('Biological and Biomedical Sciences', 'ENIGINEERING'),
-- ('Business', 'BUSINESS')
-- ('Communication, Journalism, and Related Programs', 'COMMUNICATIONS'),
-- ('Communications Technologies/technicians and Support Services', 'COMMUNICATIONS'),
-- ('Computer and Information Sciences and Support Services', 'IT'),
-- ('Construction Trades', 'ENGINEERING'),
-- ('Education', 'EDUCATION'),
-- ('Engineering Technologies and Engineering-Related Fields', 'ENGINEERING'),
-- ('Engineering', 'ENGINEERING'),
-- ('English Language and Literature/letters', 'LANGUAGE'),
-- ('Family and Consumer Sciences/Human Sciences', 'SOCIAL STUDIES');

-- Foreign Languages, Literatures, and Linguistics
-- Health Professions and Related Programs
-- History
-- Homeland Security, Law Enforcement, Firefighting
-- Human Services
-- Legal Professions and Studies
-- Liberal Arts and Sciences Studies and Humanities
-- Library Science
-- Mathematics and Statistics
-- Mechanic and Repair Technologies/technicians
-- Military Technologies and Applied Sciences
-- Multi/interdisciplinary Studies
-- Natural Resources and Conservation
-- Parks, Recreation, Leisure, and Fitness Studies
-- Personal and Culinary Services
-- Philosophy and Religious Studies
-- Physical Sciences
-- Precision Production
-- Architecture and Related Services
-- Area, Ethnic, Cultural, Gender, and Group Studies
-- Aviation
-- Biological and Biomedical Sciences