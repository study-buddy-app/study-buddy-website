SELECT DISTINCT tr.tutor_id, tr.f_name, tr.l_name, tr.email, tr.city, tr.state, (s.subject)
FROM tbl_tutor tr
INNER JOIN tbl_backpack bk
ON  tr.tutor_id = bk.tutor_id
INNER JOIN tbl_subject s
ON s.subject_id = bk.subject
WHERE tr.state = $1 AND s.subject_id = $2
ORDER BY subject;