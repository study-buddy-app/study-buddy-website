UPDATE tbl_tutor
SET f_name = $1,
    l_name = $2,
    username = $3,
    email = $4
WHERE tutor_id = $5;
SELECT f_name, l_name, username, email
FROM tbl_tutor
WHERE tutor_id =$5
