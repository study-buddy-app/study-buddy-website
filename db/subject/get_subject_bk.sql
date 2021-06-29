SELECT DISTINCT s.subject_id, (s.subject)
FROM tbl_subject s
JOIN tbl_student_subject_junction sj
ON s.subject_id = sj.subject_id
WHERE sj.student_id = $1
ORDER BY s.subject;