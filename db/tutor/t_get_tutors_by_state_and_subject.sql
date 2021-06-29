SELECT DISTINCT t.tutor_id, t.f_name, t.l_name, t.email, t.city, t.state, (s.subject) 
FROM tbl_tutor t
INNER JOIN tbl_tutor_subject_junction j
ON  t.tutor_id = j.tutor_id
INNER JOIN tbl_subject s
ON s.subject_id = j.subject_id
WHERE  t.state = $1 AND s.subject_id =$2
ORDER BY subject;