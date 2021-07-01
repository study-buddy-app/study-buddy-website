  
SELECT * FROM tbl_student_subject_junction sj 
JOIN tbl_subject s ON sj.subject_id = s.subject_id
WHERE sj.student_id = $1
ORDER BY s.subject;