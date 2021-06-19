INSERT INTO tbl_tutor
(username, password, usertype, email, f_name, l_name, age)
VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;