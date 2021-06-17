DELETE FROM tbl_session
WHERE student_id = $1 AND tutor_id = $2;
SELECT*FROM tbl_session
WHERE student_id = $1
ORDER BY tutor_id;