SELECT * FROM tbl_tutor_subject_junction sj 
JOIN tbl_subject s ON sj.subject_id = s.subject_id
WHERE sj.tutor_id = $1
ORDER BY s.subject;