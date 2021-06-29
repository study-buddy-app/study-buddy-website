SELECT DISTINCT st.student_id, st.f_name, st.l_name, st.email, st.city, st.state, (s.subject) 
FROM tbl_student st
INNER JOIN tbl_student_subject_junction j
ON  st.student_id = j.student_id
INNER JOIN tbl_subject s
ON s.subject_id = j.subject_id
WHERE s.subject_id = $1
ORDER BY subject;