INSERT INTO tbl_student_subject_junction
(student_id, subject_id)
VALUES
($1,$2);
SELECT sj.student_id, s.subject, s.subject_id 
FROM tbl_student_subject_junction sj 
JOIN tbl_subject s 
ON sj.subject_id = s.subject_id
WHERE sj.student_id = $1
ORDER BY sj.subject_id;