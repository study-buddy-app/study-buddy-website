UPDATE tbl_tutor
SET f_name = $1,
    l_name = $2,
    username = $3,
    email = $4,
    age = $5,
    subjects = $6
WHERE username = $3;
SELECT f_name, l_name, username, email, subjects FROM tbl_tutor
WHERE username = $3;