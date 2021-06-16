DROP TABLE IF EXISTS tbl_tutor;
DROP TABLE IF EXISTS tbl_session;
DROP TABLE IF EXISTS tbl_subject;
DROP TABLE IF EXISTS tbl_student;


CREATE TABLE tbl_student (
  student_id SERIAL PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  age INT,
  password VARCHAR(100)
);

CREATE TABLE tbl_subject (
  subject_id SERIAL PRIMARY KEY,
  tutor_id REFERENCES(tbl_tutor(tutor_id)),
  student_id REFERENCES(tbl_student(student_id)),
  subject Subject
);

CREATE TABLE tbl_session (
  session_id SERIAL PRIMARY KEY,
  student_id REFERENCES(tbl_student(student_id)),
  date DATE,
  tutor_id REFERENCES(tbl_tutor(tutor_id)),
  start_time VARCHAR(300);
  end_time VARCHAR(300)
);

CREATE TABLE tbl_tutor (
  tutor_id SERIAL PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  age INT,
  Subjects VARCHAR[],
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