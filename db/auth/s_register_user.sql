INSERT INTO tbl_student
(username, password, usertype, email, f_name, l_name, age, state, city)
VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *;