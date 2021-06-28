SELECT DISTINCT st.student_id, st.f_name, st.l_name, st.email, st.city, st.state, (s.subject)
FROM tbl_student st
INNER JOIN tbl_backpack bk
ON  st.student_id = bk.student_id
INNER JOIN tbl_subject s
ON s.subject_id = bk.subject
WHERE st.state = $1 AND s.subject_id = $2
ORDER BY subject;