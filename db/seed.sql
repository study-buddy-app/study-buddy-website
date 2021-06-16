DROP TABLE IF EXISTS tbl_tutor;
DROP TABLE IF EXISTS tbl_session;
DROP TABLE IF EXISTS tbl_subject;
DROP TABLE IF EXISTS tbl_student;


CREATE TABLE "tbl_student" (
  "student_id" SERIAL PRIMARY KEY,
  "f_name" VARCHAR(50),
  "l_name" VARCHAR(50),
  "username" VARCHAR(50),
  "email" VARCHAR(50),
  "age" INT,
  "password" VARCHAR(100)
);

CREATE TABLE "tbl_subject" (
  "subject_id" SERIAL PRIMARY KEY,
  "tutor_id" REFERENCES(tbl_tutor(tutor_id)),
  "student_id" REFERENCES(tbl_student(student_id)),
  "subject" Subject
);

CREATE TABLE "tbl_session" (
  "session_id" SERIAL PRIMARY KEY,
  "student_id" REFERENCES(tbl_student(student_id)),
  "date" DATE,
  "tutor_id" REFERENCES(tbl_tutor(tutor_id)),
);

CREATE TABLE "tbl_tutor" (
  "tutor_id" SERIAL PRIMARY KEY,
  "f_name" VARCHAR(50),
  "l_name" VARCHAR(50),
  "username" VARCHAR(50),
  "email" VARCHAR(50),
  "age" INT,
  "Subjects" VARCHAR[],
  "password" VARCHAR(100)
);
