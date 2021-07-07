INSERT INTO tbl_tutor_subject_junction
(tutor_id, subject_id)
VALUES
($1,$2);
SELECT sj.tutor_id, s.subject, s.subject_id 
FROM tbl_tutor_subject_junction sj 
JOIN tbl_subject s 
ON sj.subject_id = s.subject_id
WHERE sj.tutor_id = $1
ORDER BY s.subject;