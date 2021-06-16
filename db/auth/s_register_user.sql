INSERT INTO tbl_student
(username, password, usertype)
VALUES($1, $2, $3) RETURNING *;