UPDATE tbl_student
SET f_name = $1,
    l_name = $2,
    username = $3,
    email = $4
WHERE student_id = $5;
SELECT f_name, l_name, username, email
FROM tbl_student
WHERE student_id =$5