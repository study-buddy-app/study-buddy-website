INSERT INTO tbl_tutor
(username, password, usertype)
VALUES($1, $2, $3) RETURNING *;